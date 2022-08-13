import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramData } from '../models/ProgramData';
import { Time } from '../models/Time';

@Component({
  selector: 'app-start-bar',
  templateUrl: './start-bar.component.html',
  styleUrls: ['./start-bar.component.scss']
})
export class StartBarComponent implements OnInit {

  @Input() programs!: Set<ProgramData>;
  @Output() activateProgram = new EventEmitter<string>();

  time: Time = new Time;

  intervalId: any;

  constructor() {}

  ngOnInit(): void {
    this.intervalId = setInterval( () => {
      this.getTime();
    }, 1000)    
  }

  getTime() {
    let date = new Date();
    let hours = date.getHours();
    this.time.amPm = hours < 12 ? "AM" : "PM";
    hours %= 12;
    let hoursString: string;
    if(hours === 0) {
      hoursString = "12";
    } else {
      hoursString = hours.toString();
    }
    let minutesString = date.getMinutes().toString();
    hoursString = this.addZeroToTime(hoursString);
    minutesString = this.addZeroToTime(minutesString);
    this.time.hours = hoursString;
    this.time.minutes = minutesString;
  }

  private addZeroToTime(time: string) {
    if(parseInt(time) < 10) {
      time = "0" + time;
    }
    return time;
  }

  makeProgramActive(programName: string) {
    this.activateProgram.emit(programName);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId)
  }

}
