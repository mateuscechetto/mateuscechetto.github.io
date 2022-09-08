import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../models/Project';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent extends WindowComponent implements OnInit {

  @Input() project!: Project;

  readMore: boolean = false;

  constructor() { super() }

  onPressedReadMore() {
    this.readMore = !this.readMore;
  }

}
