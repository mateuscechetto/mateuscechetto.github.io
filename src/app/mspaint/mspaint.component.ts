import { Component, OnInit } from '@angular/core';
import { IResizeEvent } from 'angular2-draggable/lib/models/resize-event';
import { WindowComponent } from '../window/window.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaintCanvasDirective } from '../paint-canvas.directive';
import { NgFor, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-mspaint',
    templateUrl: './mspaint.component.html',
    styleUrls: ['./mspaint.component.scss'],
    standalone: true,
    imports: [WindowComponent, NgFor, PaintCanvasDirective, KeyValuePipe, TranslateModule]
})
export class MspaintComponent extends WindowComponent implements OnInit {

  activeColor: string = "#000000";
  lineWidth: number = 5;
  shouldClear: boolean = false;
  shouldDownload: boolean = false;
  shouldOpenInNewTab: boolean = false;

  windowHeight: number = 520;
  windowWidth: number = 820;
  handleHeight: number = 26;
  toolbarWidth: number = 120;

  colors = {
    '00black': "#000000",
    '01white': "#FFFFFF",
    '02blue': "#0000FF",
    '03cyan': "#00FFFF",
    '04red': "#FF0000",
    '05green': "#00FF00",
    '06hotPink': "#FF0084",
    '07pink': "#FFC0CB",
    '08brown': "#964B00",
    '09orange': "#FFA500",
    '10gray': '#808080',
    '11yellow': "#FFFF00",
  }

  constructor() { super() }

  override onWindowResizing(event: IResizeEvent) {
    this.windowHeight = event.size.height;
    this.windowWidth = event.size.width;
  }

  changeColor(colorName: string) {
    this.activeColor = this.colors[colorName as keyof typeof this.colors];
  }

  changeLineWidth(value: string) {
    this.lineWidth = parseInt(value);
  }

  clearCanvas() {
    this.shouldClear = true;
  }

  downloadImage() {
    this.shouldDownload = true;
  }

  openImageNewTab() {
    this.shouldOpenInNewTab = true;
  }

}
