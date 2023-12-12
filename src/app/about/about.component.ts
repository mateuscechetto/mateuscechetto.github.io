import { DOCUMENT, NgFor } from '@angular/common';
import { Component, HostListener, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WindowComponent } from '../window/window.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [WindowComponent, NgFor, TranslateModule]
})
export class AboutComponent extends WindowComponent implements OnInit {

  elem: any;
  isFullScreen: boolean = false;

  tips: string[] = ['ABOUT.TIPS.1', 'ABOUT.TIPS.2', 'ABOUT.TIPS.3', 'ABOUT.TIPS.4', 'ABOUT.TIPS.5', 'ABOUT.TIPS.6'];

  constructor(
    @Inject(DOCUMENT) private document: any
  ) { super() }

  override ngOnInit(): void {
    this.elem = document.documentElement;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes() {
    this.checkScreenMode();
  }

  checkScreenMode() {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }

  toggleFullScreen() {
    if(this.isFullScreen) {
      this.closeFullScreen();
    } else {
      this.openFullScreen();
    }
  }

  openFullScreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  closeFullScreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
