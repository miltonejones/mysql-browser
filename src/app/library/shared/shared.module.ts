import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { ToolbarButtonService } from './services/toolbar-button.service';
import { SharedService } from './shared.service';



@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule
  ],
  exports: [SharedComponent],
  providers: [ToolbarButtonService, SharedService]
})
export class SharedModule { }
