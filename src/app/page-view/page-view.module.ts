import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionViewComponent } from './pages/connection-view/connection-view.component';
import { AngularMaterialModule, ComponentContainerModule } from '../library';
import { ObjectViewComponent } from './pages/object-view/object-view.component';
import { QueryViewComponent } from './pages/query-view/query-view.component';
import { QueryPaneModule } from '../library/query-pane/query-pane.module';
import { ConstraintEditComponent, ConstraintLinkComponent, KeyEditComponent, NoEditComponent, TitleEditComponent, TypeEditComponent } from './pages/object-view/components/title-edit/title-edit.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ConnectionViewComponent, ObjectViewComponent,ConstraintLinkComponent, ConstraintEditComponent, QueryViewComponent, NoEditComponent, TypeEditComponent, TitleEditComponent, KeyEditComponent],
  exports: [ConnectionViewComponent, ObjectViewComponent,ConstraintLinkComponent, ConstraintEditComponent, QueryViewComponent, NoEditComponent, TypeEditComponent, TitleEditComponent, KeyEditComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ComponentContainerModule,
    QueryPaneModule,
    CommonModule
  ]
})
export class PageViewModule { }
