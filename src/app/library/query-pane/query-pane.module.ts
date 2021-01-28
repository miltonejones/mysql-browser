import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryPaneComponent } from './query-pane.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [QueryPaneComponent],
  imports: [
    AngularMaterialModule,
    FormsModule,
    CommonModule
  ],
  exports: [QueryPaneComponent]
})
export class QueryPaneModule { }
