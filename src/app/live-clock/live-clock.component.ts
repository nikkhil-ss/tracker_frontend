import { Component, } from '@angular/core';

@Component({
  selector: 'app-live-clock',
  templateUrl: './live-clock.component.html',
  styleUrls: ['./live-clock.component.css']
})
export class LiveClockComponent {
  title = 'clock-greets';
  time: Date = new Date();
  hours: number = 0;
  msg: string = '';

  constructor() {
    setInterval(() => {
      this.time = new Date();
      this.decide();
    }, 1000);

    this.decide(); 
  }

  decide() {
    this.hours = new Date().getHours();
    if (this.hours < 6) {
      this.msg = "Sleep lah";
    } else if (this.hours < 12) {
      this.msg = "Good Morning";
    } else if (this.hours < 17) {
      this.msg = "Good Afternoon";
    } else if (this.hours < 20) {
      this.msg = "Good Evening";
    } else {
      this.msg = "Good Night";
    }
  }

  firebaseSubscribing() {

  }
}
