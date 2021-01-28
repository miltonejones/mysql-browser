import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService, ToolbarButtonService } from 'src/app/library';
import { MysqlColumn } from 'src/app/library/shared/classes/mysql-column';
import { MysqlTable } from 'src/app/library/shared/classes/mysql-table';
import { ToolbarButtonConfig } from 'src/app/library/shared/viewmodel/toolbar-button-config';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConstraintEditComponent, ConstraintLinkComponent, KeyEditComponent, NoEditComponent, TitleEditComponent, TypeEditComponent } from './components/title-edit/title-edit.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-object-view',
  templateUrl: './object-view.component.html',
  styleUrls: ['./object-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('225ms linear')),
    ]),
    trigger('textExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('225ms linear')),
    ]),
  ],
})
export class ObjectViewComponent implements OnInit {
  dataSource: MatTableDataSource<MysqlColumn> = new MatTableDataSource<MysqlColumn>([]);
  tableName = '';
  state = 'collapsed'
  columnDef = ['Name', 'Type', 'Length', 'AllowNull', 'Key', 'Constraint'];
  editorDef = [
    {
      name: 'Name',
      component: TitleEditComponent
    },
    {
      name: 'Type',
      component: TypeEditComponent
    },
    {
      name: 'Length',
      component: TitleEditComponent
    },
    {
      name: 'AllowNull',
      component: KeyEditComponent
    },
    {
      name: 'Key',
      component: ConstraintEditComponent
    },
    {
      name: 'Constraint',
      component: ConstraintLinkComponent
    },
  ]
  gridIcon: { [p: string]: string } = {
    'PRI': 'vpn_key',
    'MUL': 'lock'
  };
  expandedElement: MysqlColumn | null = null;
  visibleText = false;
  openBtn = {
    icon: 'import_contacts',
    action: () => this.open()
  };
  showBtn: ToolbarButtonConfig = {
    icon: 'description',
    action: () => {
      this.state = this.state === 'expanded'
        ? 'collapsed'
        : 'expanded';
      this.showBtn.active = this.state === 'expanded';
    }
  };
  saveBtn = {
    icon: 'save',
    action: () => this.open()
  };
  plusBtn = {
    icon: 'add',
    action: () => this.add()
  };
  constructor(
    private service: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmd: ToolbarButtonService) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => this.init(params));
    this.cmd.buttons = [this.openBtn, this.plusBtn];
  }
  get editDef(): any[] {
    return this.editorDef.map(def => {
      return {
        field: def.name, 
        name: `edit-${def.name}`,
        component: def.component
      }
    });
  }
  get editConf(): string[] {
    return this.editorDef.map(f => `edit-${f.name}`)
  }
  get selectedObject(): MysqlTable {
    return this.service.connection.Objects?.filter(tab => {
      return tab.Name === this.tableName;
    })[0];
  }
  get Columns(): MatTableDataSource<MysqlColumn> {
    return new MatTableDataSource<MysqlColumn>(this.selectedObject?.Columns);
  }
  get isTable(): boolean {
    return this.selectedObject?.Type.indexOf('TABLE') > -1;
  }
  add(): void {
    this.expandedElement = this.selectedObject.add();
    console.log(this.Columns)
  }
  open(): void {
    this.service.openQuery('SELECT * FROM ' + this.tableName, this.tableName)
      .subscribe(() => {
        const length = this.service.connection.Queries?.length as number;
        this.router.navigate(['/query', length - 1])
      });
  }
  openColumn(column: MysqlColumn) {
    if (this.expandedElement?.Name === column.Name) {
      this.router.navigate(['/object', this.service.connection.HOSTNAME, this.selectedObject.Name])
      return;
    }
    this.router.navigate(['/object', this.service.connection.HOSTNAME, this.selectedObject.Name, column.Name])
  }
  valueChange(d: MysqlColumn) {
    console.log(d);
    d.Dirty = true;
    this.cmd.buttons = [this.openBtn, this.plusBtn, this.saveBtn];
  }
  setButtons(): void {
    this.cmd.set(this.isTable ? [this.openBtn, this.plusBtn] : [this.openBtn, this.showBtn])
  }
  init(params: { [p: string]: string }): void {
    this.state = 'collapsed';
    if (params.object) {
      this.tableName = params.object;
      this.service.connectionClosed.subscribe(() => {
        if (params.column) {
          const objects = this.selectedObject?.Columns;
          this.expandedElement = objects?.filter(column => {
            return column.Name === params.column;
          })[0];
        }
        if (this.selectedObject?.Type === 'PROCEDURE') {
          this.state = 'expanded';
        }
        this.setButtons();
      });
      this.service.openObject(params.object, params.db);
    }
  }
} 