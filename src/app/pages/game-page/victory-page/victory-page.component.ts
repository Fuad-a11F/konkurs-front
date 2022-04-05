import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-victory-page',
  templateUrl: './victory-page.component.html',
  styleUrls: ['./victory-page.component.scss'],
})
export class VictoryPageComponent implements OnInit {
  constructor(private router: Router, public userService: UserService) {}

  modal = false;
  modal_warning = false;
  subject = '';

  loading = true;

  ngOnInit(): void {}

  openTestOrResult(e: any) {
    this.subject = e.target.dataset.subject;

    if (e.target.style.backgroundColor === 'red') {
      this.modal_warning = true;
    } else {
      this.router.navigate([`/game/answer/${this.subject.replace(' ', '_')}`]);
    }
  }

  beginTest() {
    this.userService.addVictory(this.subject).subscribe(() => {
      this.router.navigate([
        `/game/question/${this.subject.replace(' ', '_')}`,
      ]);
    });
  }

  check(subject: string) {
    for (let i = 0; i < this.userService.user.victory.length; i++) {
      if (this.userService.user.victory[i].victory === subject) {
        return 'green';
      }
    }

    return 'red';
  }
}
