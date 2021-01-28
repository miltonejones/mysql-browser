import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService, ToolbarButtonService } from 'src/app/library';
import { MysqlTable } from 'src/app/library/shared/classes/mysql-table';

@Component({
  selector: 'app-connection-view',
  templateUrl: './connection-view.component.html',
  styleUrls: ['./connection-view.component.scss']
})
export class ConnectionViewComponent implements OnInit {
  dataSource: MatTableDataSource<MysqlTable> = new MatTableDataSource<MysqlTable>([]);
  columnConfig: ColumnConfig[] = [
    {
      text: 'Name',
      style: 'link-text',
      action: (row: any) => this.open(row)
    },
    {
      text: 'Type'
    },
    {
      text: 'Rows'
    }
  ];
  constructor(
    public service: SharedService,
    private cmd: ToolbarButtonService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  get Objects(): MatTableDataSource<MysqlTable> {
    this.dataSource = new MatTableDataSource<MysqlTable>(this.service.connection.Objects); 
    return this.dataSource;
  }
  get columnDef(): string[] {
    return this.columnConfig.map(f => f.text);
  }
  init(params: any) {
    if (params.db) {
      this.service.openConnection(params.db).subscribe(console.log);
      console.log(this.columnDef)
    }
  }
  open(row: MysqlTable): void {
    this.router.navigate(['/object', this.service.connection.HOSTNAME, row.Name])
  }
  exec(def: ColumnConfig, obj: MysqlTable): void {
    if (def.action) {
      def.action(obj);
    }
  }
  create(): void {
    this.router.navigate(['/add'])
  }
  ngOnInit(): void {
    this.cmd.set([{
      icon: 'link',
      action: () => this.create()
    }]);
    this.activatedRoute.params.subscribe((params) => this.init(params));
  }
}


export interface ColumnConfig {
  text: string;
  style?: string;
  action?: (i: any) => void;
}