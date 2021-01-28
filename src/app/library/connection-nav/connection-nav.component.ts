import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MysqlColumn } from '../shared/classes/mysql-column';
import { MysqlTable } from '../shared/classes/mysql-table';
import { SharedService } from '../shared/shared.service';
import { DbConnection } from '../shared/viewmodel/db-connection';

@Component({
  selector: '[app-connection-nav]',
  templateUrl: './connection-nav.component.html',
  styleUrls: ['./connection-nav.component.scss']
})
export class ConnectionNavComponent implements OnInit {

  currentURL = '';
  constructor(public service: SharedService, private router: Router,
    private activatedRoute: ActivatedRoute) { }
 

  openConnection(connection: DbConnection) {
    this.router.navigate(['/db', connection.HOSTNAME]).then(this.init.bind(this))
  }
  openObject(connection: DbConnection, object: MysqlTable) {
    this.router.navigate(['/object', connection.HOSTNAME, object.Name]).then(this.init.bind(this))
  }
  openColumn(object: MysqlTable, column: MysqlColumn) {
    this.router.navigate(['/object', this.service.connection.HOSTNAME, object.Name, column.Name]).then(this.init.bind(this))
  }
  init(params: any): void {
    this.currentURL = location.href;
  //  console.log(this.currentURL, params)
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => this.init(params));
    this.activatedRoute.url.subscribe((params) => this.init(params));
    this.router.events.subscribe((params) => this.init(params));
  }

}
