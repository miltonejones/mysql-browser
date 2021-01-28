import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { ConnectionViewComponent } from './page-view/pages/connection-view/connection-view.component';
import { ObjectViewComponent } from './page-view/pages/object-view/object-view.component';
import { QueryViewComponent } from './page-view/pages/query-view/query-view.component';
import { ConnectionFormComponent } from './library';
const routes: Routes = [
  { path: 'db/:db', component: ConnectionViewComponent },
  { path: 'object/:db/:object', component: ObjectViewComponent },
  { path: 'object/:db/:object/:column', component: ObjectViewComponent },
  { path: 'query/:index', component: QueryViewComponent },
  { path: 'home', component: ConnectionViewComponent },
  { path: 'add', component: ConnectionFormComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
