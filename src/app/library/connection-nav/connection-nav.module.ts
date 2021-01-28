import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionNavComponent } from './connection-nav.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [ConnectionNavComponent],
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  exports: [ConnectionNavComponent]
})
export class ConnectionNavModule { }
