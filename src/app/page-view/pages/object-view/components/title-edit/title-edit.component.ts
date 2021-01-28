import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/library';
import {map, startWith} from 'rxjs/operators'; 

@Component({
  selector: 'app-title-edit',
  template: `
<mat-form-field [style.width.px]="90">
  <input matInput [name]="field" (change)="update()" [(ngModel)]="data[field]">
</mat-form-field>`,
  styleUrls: ['./title-edit.component.scss']
})
export class TitleEditComponent implements OnInit {
  @Input() data: any;
  @Input() field = '';
  @Input() valueChange = new EventEmitter<void>();
  constructor(public shared: SharedService) { }
  ngOnInit(): void {
  }
  update(): void {
    this.valueChange.emit();
  }
}

@Component({
  selector: 'app-no-edit',
  template: `
 {{data[field]}}
  `,
  styleUrls: ['./title-edit.component.scss']
})
export class NoEditComponent extends TitleEditComponent implements OnInit {
  ngOnInit(): void { }
}

@Component({
  selector: 'app-key-edit',
  template: `
  <mat-slide-toggle (change)="change($event)" [(ngModel)]="isChecked"></mat-slide-toggle>
  `,
  styleUrls: ['./title-edit.component.scss']
})
export class KeyEditComponent extends TitleEditComponent implements OnInit {
  isChecked = false;
  ngOnInit(): void {
    this.isChecked = this.data[this.field] === 'YES';
  }
  change(e: any): void {
    this.data[this.field] = e.checked ? 'YES' : 'NO';
    this.update();
  }
}

@Component({
  selector: 'app-constraint-edit',
  template: `
 <mat-icon (click)="update()">{{icon}}</mat-icon>
  `,
  styleUrls: ['./title-edit.component.scss']
})
export class ConstraintEditComponent extends TitleEditComponent implements OnInit {
  icon = '';
  ngOnInit(): void {
    this.icon = this.data[this.field] ? 'delete' : 'add';
  }
  change(e: any): void {
    this.data[this.field] = e.checked ? 'YES' : 'NO';
  }
}

@Component({
  selector: 'app-constraint-link',
  template: `
<a [href]="href">{{data.Constraint}}</a>
  `,
  styleUrls: ['./title-edit.component.scss']
})
export class ConstraintLinkComponent extends TitleEditComponent implements OnInit {
  href = '';
  ngOnInit(): void {
    const Constraints = this.data.Constraints;
    const path = this.data.Path.split('/').shift();
    if (Constraints?.length) {
      const constraint = Constraints.pop();
      this.href = `/object/${path}/${constraint.REFERENCED_TABLE_NAME}/${constraint.REFERENCED_COLUMN_NAME}`
    }
  }
  change(e: any): void {
    this.data[this.field] = e.checked ? 'YES' : 'NO';
  }
}

@Component({
  selector: 'app-type-edit',
  template: `
  <form class="example-form">
  <mat-form-field class="example-full-width">
    <mat-label>Data Type</mat-label>
    <input type="text"
           placeholder="Pick one"
           aria-label="Number"
           matInput
           [formControl]="myControl"
           [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="optionSelected($event)">
      <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
        {{option}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
</form> `,
  styleUrls: ['./title-edit.component.scss']
})
export class TypeEditComponent extends TitleEditComponent implements OnInit {
  dataTypes: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(public shared: SharedService) {
    super(shared)
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dataTypes.filter(option => option.toLowerCase().includes(filterValue));
  }
  optionSelected(e: any): void {
    console.log({e});
    this.data[this.field] = e.option.value;
    this.update();
  }
  ngOnInit(): void {
    const value = this.data[this.field];
    this.shared.getDataTypes()
      .subscribe((types:any) => {
        this.dataTypes = types.map((b: any) => b.DATA_TYPE);
        this.myControl.setValue(value)
      })
  }
}


