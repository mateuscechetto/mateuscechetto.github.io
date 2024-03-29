import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IResizeEvent } from 'angular2-draggable/lib/models/resize-event';
import { ProgramData } from '../models/ProgramData';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss'],
    standalone: true,
    imports: [AngularDraggableModule, NgClass, TranslateModule]
})
export class WindowComponent implements OnInit {

  @Input() program!: ProgramData;
  @Output() activateProgram = new EventEmitter<string>();
  @Output() closeProgram = new EventEmitter<string>();
  @Output() windowResizing = new EventEmitter<IResizeEvent>();
  @Input() classes: string[] = [];
  

  constructor() { }

  ngOnInit(): void {
  }

  makeWindowActive() {
    this.activateProgram.emit(this.program.key);
  }

  closeWindow() {
    this.closeProgram.emit(this.program.key);
  }

  onWindowResizing(event: IResizeEvent) {
    this.windowResizing.emit(event);
  }

}
