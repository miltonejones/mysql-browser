import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MysqlColumn, MySqlConstraint } from './classes/mysql-column';
import { MysqlTable } from './classes/mysql-table';
import { collateConnection, DbConnection } from './viewmodel/db-connection';
import { DbRequest } from './viewmodel/db-request';
import { DbQuery } from './viewmodel/db-query';
export const API_URL = 'http://localhost:2020/book';
export const COOKIE_NAME = 'DATABASE_CONFIGS';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  connectionClosed = new EventEmitter<void>();
  connections: DbConnection[] = [];
  connection: DbConnection = {} as DbConnection;
  dataTypes: any;
  constructor(private http: HttpClient) {
    this.connections = JSON.parse(localStorage[COOKIE_NAME] || '[]');
  }
  choose(db: DbConnection): Observable<any>  {
    this.connection = db;
    return this.getConnection()
  }
  getDataTypes(): Observable<any> {
    const query = `SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS GROUP BY DATA_TYPE ORDER BY DATA_TYPE`;
    const request: DbRequest = {
      config: this.connection,
      query
    };

    return new Observable(observer => {
      if (this.dataTypes) {
       //  console.log (this.dataTypes);
        observer.next(this.dataTypes);
        return;
      }
      this.query(request).subscribe(data => observer.next(data))
    })
  }
  getConnection(): Observable<any> {
    const query = `SELECT *
                  FROM information_schema.TABLES
                  WHERE TABLE_SCHEMA = '${this.connection.DATABASE}';`;
    const request: DbRequest = {
      config: this.connection,
      query
    };
    return new Observable(observer => {
      this.query(request).subscribe((ret: any[]) => {
        this.connection.Objects = ret.map((ob: any) => new MysqlTable(ob));
        this.getProcedures()
          .subscribe((procs: any) => {
            procs.map((proc:any) => { 
              this.connection.Objects.push(new MysqlTable({
                TABLE_NAME: proc.routine_name,
                TABLE_TYPE: 'PROCEDURE'
              }))
            });
            collateConnection(this.connection);
            console.log(this.connection)
            observer.next(this.connection);
          })
      });
    })
  }
  getProcedures(): Observable<any> {
    const request: DbRequest = {
      config: this.connection,
      query: `SELECT 
      routine_name
          FROM
              information_schema.routines
          WHERE
      routine_type = 'PROCEDURE'  AND routine_schema = '${this.connection.DATABASE}' `
    };
    console.log({request})
    return this.query(request);
  }
  openConnection(connection: string): Observable<any> {
    const self = this.connections.filter(c => c.HOSTNAME === connection)[0];
    return this.choose(self);
  }
  openObject(table: string, db = ''): void {
    const open = () => {
      const self = this.connection.Objects?.filter(c => c.Name === table)[0];
      if (self) {
        this.getObject(self);
        return;
      }
      console.error('NO TABLE')
    }
    if (this.connection?.Objects) {
      open();
      return;
    }
    if (db?.length) {
      this.openConnection(db).subscribe(open.bind(this));
      return;
    }
    console.error('NO CONNECTION');
  }
  execQuery(query: DbQuery): Observable<any> {
    const request: DbRequest = {
      config: this.connection,
      query: query.text,
      page: query.page,
      size: query.size
    };
    return new Observable(observer => {
      const queries = (this.connection.Queries || []).filter(q => q.label != query.label);
      this.query(request).subscribe((ret: any) => {
        query.response = ret;
        queries.push(query);
        this.connection.Queries = queries;
        observer.next(queries)
      });
    });

  }
  openQuery(text: string, label: string): Observable<any> {
    const query: DbQuery = {
      label,
      text,
      page: 1,
      size: 30,
      next: () => this.execQuery(query)
    };
    return this.execQuery(query);
  }
  getObject(table: MysqlTable): void {
    const query = `
      SELECT *
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = '${this.connection.DATABASE}' AND TABLE_NAME = '${table.Name}';`
    const request: DbRequest = {
      config: this.connection,
      query
    };
    const create = {
      config: this.connection,
      query: `SELECT *
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = '${table.Name}'  `
    };
    if (!table.isProc) {
      this.query(request).subscribe((ret: any[]) => {
        this.query(create).subscribe((con: MySqlConstraint[]) => {
          table.Columns = ret.map((col: any) => new MysqlColumn(col, con));
         //  console.log(con);
          if (!table.isTable) {
            this.getCompiledObject(table).subscribe((view: any) => {
              table.SQL = view[0]['Create View'];
             //  console.log(table);
            })
          }
          collateConnection(this.connection);
          this.connectionClosed.emit();
        })
      });
      return;
    }
    this.getCompiledObject(table, 'PROCEDURE')
      .subscribe((proc: any) => {
        console.log(proc);
        table.SQL = proc[0]['Create Procedure'];
        this.connectionClosed.emit();
      })
  }
  getCompiledObject(table: MysqlTable, type = 'VIEW'): Observable<any> {
    const request: DbRequest = {
      config: this.connection,
      query: `SHOW CREATE ${type} ${table.Name}`
    };
    return this.query(request);
  }
  save($event: any): void {
    const old = JSON.parse(localStorage[COOKIE_NAME] || '[]')
      .filter((my: any) => {
        return my.HOSTNAME !== $event.HOSTNAME 
          && my.KEY !== $event.KEY;
      });
    if (!$event.KEY) {
      $event.KEY = $event.HOSTNAME;
    }
    old.push($event);
    localStorage.setItem(COOKIE_NAME, JSON.stringify(old));
  }
  query(request: DbRequest): Observable<any> {
    return this.http.post(API_URL, request);
  }
}