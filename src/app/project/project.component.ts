import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../models/Project';
import { WindowComponent } from '../window/window.component';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryModule } from 'ng-gallery';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [WindowComponent, NgFor, NgClass, NgIf, GalleryModule, TranslateModule]
})
export class ProjectComponent extends WindowComponent implements OnInit {

  @Input() project!: Project;

  readMore: boolean = false;

  constructor() { super() }

  onPressedReadMore() {
    this.readMore = !this.readMore;
  }

}
