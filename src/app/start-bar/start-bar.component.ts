import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ProgramData } from '../models/ProgramData';
import { Time } from '../models/Time';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../click-outside.directive';

@Component({
    selector: 'app-start-bar',
    templateUrl: './start-bar.component.html',
    styleUrls: ['./start-bar.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, NgClass, TranslateModule]
})
export class StartBarComponent implements OnInit {

  @Input() programs!: Set<ProgramData>;
  @Input() language: string = 'en-US';
  @Output() activateProgram = new EventEmitter<string>();
  @Output() changedLanguage = new EventEmitter<string>();

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Meta') {
      this.toggleStartMenu();
    }
  }

  shouldShowStartMenu: boolean = false;
  shouldShowSocialSubMenu: boolean = false;
  shouldShowLanguagesSubMenu: boolean = false;
  shouldShowProgramsSubMenu: boolean = false;

  time: Time = new Time;

  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.getTime();
    }, 1000)
  }

  getTime() {
    let date = new Date();
    let hours = date.getHours();
    let hoursString: string;
    if (this.language == "pt-BR") {
      hoursString = hours.toString();
      this.time.amPm = "";
    } else {
      this.time.amPm = hours < 12 ? "AM" : "PM";
      hours %= 12;
      if (hours === 0) {
        hoursString = "12";
      } else {
        hoursString = hours.toString();
      }
    }
    let minutesString = date.getMinutes().toString();
    hoursString = this.addZeroToTime(hoursString);
    minutesString = this.addZeroToTime(minutesString);
    this.time.hours = hoursString;
    this.time.minutes = minutesString;
  }

  private addZeroToTime(time: string) {
    if (parseInt(time) < 10) {
      time = "0" + time;
    }
    return time;
  }

  makeProgramActive(programName: string) {
    this.activateProgram.emit(programName);
  }

  toggleStartMenu() {
    this.shouldShowStartMenu = !this.shouldShowStartMenu;
  }

  hideStartMenu() {
    this.shouldShowStartMenu = false;
  }

  showSocialSubMenu() {
    this.shouldShowSocialSubMenu = true;
  }

  hideSocialSubMenu() {
    this.shouldShowSocialSubMenu = false;
  }

  showLanguagesSubMenu() {
    this.shouldShowLanguagesSubMenu = true;
  }

  hideLanguagesSubMenu() {
    this.shouldShowLanguagesSubMenu = false;
  }

  showProgramsSubMenu() {
    this.shouldShowProgramsSubMenu = true;
  }

  hideProgramsSubMenu() {
    this.shouldShowProgramsSubMenu = false;
  }

  changeLanguage(targetLanguage: string) {
    this.changedLanguage.emit(targetLanguage);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId)
  }

}
