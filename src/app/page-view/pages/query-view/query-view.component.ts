import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService, ToolbarButtonService } from 'src/app/library';
import { DbQuery } from 'src/app/library/shared/viewmodel/db-query';

@Component({
  selector: 'app-query-view',
  templateUrl: './query-view.component.html',
  styleUrls: ['./query-view.component.scss']
})
export class QueryViewComponent implements OnInit {

  selectedIndex = 0;
  selectedQuery: DbQuery = {} as DbQuery;
  constructor(public service: SharedService, private activatedRoute: ActivatedRoute,
      private cmd: ToolbarButtonService) { }

  init(params: any): void {
    if (params.index && this.service.connection?.Queries) {
      this.selectedQuery = this.service.connection?.Queries[params.index];
      this.selectedIndex = parseInt(params.index);
      console.log(this.selectedQuery);
    }
  }
  open(): void {
    this.selectedQuery.page = 1;
    this.selectedQuery.next();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => this.init(params));
    this.cmd.clear();
  }

}
