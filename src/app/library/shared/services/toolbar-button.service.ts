import { Injectable } from '@angular/core';
import { ToolbarButtonConfig } from '../viewmodel/toolbar-button-config';

@Injectable({
  providedIn: 'root'
})
export class ToolbarButtonService {
  buttons: ToolbarButtonConfig[] = [];
  constructor() { }
  clear(): void {
    this.buttons = [];
  }
  set(buttons: ToolbarButtonConfig[]): void {
    this.buttons = buttons;
  }
}
