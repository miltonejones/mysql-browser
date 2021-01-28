import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularMaterialModule, ConnectionFormModule, ConnectionNavModule, SharedModule, SharedService } from './library';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { PageViewModule } from './page-view/page-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    PageViewModule,
    ConnectionNavModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ConnectionFormModule,
    AngularMaterialModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
