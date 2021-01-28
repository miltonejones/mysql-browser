import { Component, Input, OnInit } from '@angular/core';
import { ToolbarButtonService } from '../shared/services/toolbar-button.service';
import { DbQuery } from '../shared/viewmodel/db-query';

@Component({
  selector: 'app-query-pane',
  templateUrl: './query-pane.component.html',
  styleUrls: ['./query-pane.component.scss']
})
export class QueryPaneComponent implements OnInit {
  @Input()
  dbResponse: DbQuery = {} as DbQuery;
  dataSource: any[] = [];
  pageIndex = 0;
  constructor(private cmd: ToolbarButtonService) { }
  ngOnInit(): void {
    if (this.dbResponse.response?.result?.length) {
      const columns = [];
      const row: any = this.dbResponse.response.result[0];
      for (const name in row) {
        if (row.hasOwnProperty(name)) {
          columns.push(name)
        }
      }
      this.dataSource = this.dbResponse.response.result;
      this.dbResponse.columns = columns;
      this.cmd.buttons = [
        {
          icon: 'play_circle',
          action: () => this.open()
        }
      ]
    }
  }
  open():void {
    this.dbResponse.page = 1;
    this.pageIndex = 0;
    this.dbResponse.next()
      .subscribe(this.ngOnInit.bind(this));
  }
  page(e:any):void {
    this.dbResponse.page = e.pageIndex + 1;
    this.pageIndex = e.pageIndex;
    this.dbResponse.next()
      .subscribe(this.ngOnInit.bind(this));
  }
}
