import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-victory-page',
  templateUrl: './victory-page.component.html',
  styleUrls: ['./victory-page.component.scss']
})
export class VictoryPageComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, private http: HttpClient) { }

  modal = false
  modal_warning = false
  subject = ''

  loading = true

  ngOnInit(): void {
    console.log(this.userService.user);
  }

  openTestOrResult(e: any) {
    this.subject = e.target.dataset.subject
    
    if (e.target.style.backgroundColor === 'red') {
      this.modal_warning = true
    }

    else {
      this.router.navigate([`/game/answer/${this.subject.replace(' ', '_')}`])
    }
  }

  beginTest() {
    this.userService.addVictory(this.subject).subscribe(() => {
      this.router.navigate([`/game/question/${this.subject.replace(' ', '_')}`])
      console.log(this.userService.user);
      
    })
  }

  check(subject: string) {    
    for (let i = 0; i < this.userService.user.victory.info.length; i++) {
      if (this.userService.user.victory.info[i].victory === subject) {
        return 'green'
      }
    }

    return 'red'
  }
}
