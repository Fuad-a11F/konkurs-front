import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-clicker-page',
  templateUrl: './clicker-page.component.html',
  styleUrls: ['./clicker-page.component.scss'],
})
export class ClickerPageComponent implements OnInit {
  constructor(public userService: UserService) {}

  start = false;
  count = 0;
  timeOut: any;
  timeInterval: any;
  timeLeft = 5000;
  modal = false;

  ngOnInit(): void {}

  startGame() {
    if (this.userService.user.clicker.length < 50) {
      this.start = true;
      this.timeLeft = 5000;

      this.timeInterval = setInterval(() => {
        this.timeLeft -= 100;
      }, 100);

      this.timeOut = setTimeout(() => {
        alert(`Поздравляем! Вы набрали ${Math.round(this.count / 2)} баллов!`);
        this.userService.addClicker(this.count).subscribe();
        this.start = false;
        this.count = 0;
        this.timeLeft = 5000;
        clearTimeout(this.timeInterval);
        this.timeInterval = null;
      }, 5100);
    }
  }

  countGame() {
    this.count++;
  }

  resetGame() {
    this.start = false;
    this.count = 0;
    this.timeLeft = 5000;
    clearTimeout(this.timeOut);
    this.timeOut = null;
    clearTimeout(this.timeInterval);
    this.timeInterval = null;
  }
}
