import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService, ToolbarButtonService } from './library';
import { DbConnection } from './library/shared/viewmodel/db-connection';

export interface QueryResponse {
  columnDef: string[];
  dataSource: any;
}

export const COOKIE_NAME = 'DATABASE_CONFIGS';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'http-chunk';
  connections: DbConnection[] = [];
  connection: DbConnection = {} as DbConnection;
  queryText = 'SELECT * FROM s3Music LIMIT 15';
  opened = true;
  response: QueryResponse = {} as QueryResponse;
  constructor(
    private service: SharedService, 
    public purser: ToolbarButtonService,
    public router: Router
    ) {
    // this.service.query({
    //   config: {
    //     HOSTNAME: 'db.audiopirate.nl',
    //     PASSWORD: 'userpass',
    //     USERNAME: 'awsuser',
    //     DATABASE: 'db_audiopirate',
    //   },
    //   query: 'show tables'
    // }).subscribe (console.log)
    this.connections = JSON.parse(localStorage[COOKIE_NAME] || '[]');
  }
  get connected(): boolean {
    return !!this.connection?.DATABASE;
  }
  request(): void {
    this.service.query({
      config: this.connection,
      query: this.queryText
    }).subscribe ((dataSource: any) => {
      if (dataSource.length) {
        const first = dataSource[0];
        const columnDef = [];
        for (const n in first) {
          if (first.hasOwnProperty(n)) {
            columnDef.push(n);
          }
        }
        this.response = {dataSource, columnDef}
        console.log(this.response)
      }
    })
  }
  choose(db: DbConnection): void {
    this.connection = db;
  }
  save($event: any):void {
    const old = JSON.parse(localStorage[COOKIE_NAME] || '[]');
    old.push($event);
    localStorage.setItem(COOKIE_NAME, JSON.stringify(old));
    console.log(old)
  }
}
 