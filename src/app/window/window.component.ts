import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Position } from 'angular2-draggable';
import { ProgramData } from '../models/ProgramData';
import { Project } from '../models/Project';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  @Input() project!: Project;
  @Input() program!: ProgramData;
  @Input() position!: Position;
  @Output() activateProgram = new EventEmitter<string>();
  @Output() closeProgram = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {

  }

  makeWindowActive() {
    this.activateProgram.emit(this.program.key);
  }

  closeWindow() {
    this.closeProgram.emit(this.program.key);
  }

}
