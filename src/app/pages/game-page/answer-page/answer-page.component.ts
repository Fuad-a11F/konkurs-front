import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public userService: UserService, private router: Router) { }

  subject = ''
  question: any = null
  color = false
  loading = true

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.subject = params['subject'].replace('_', ' ');
      let flag = false
      console.log(this.userService.user);
      
      if (this.userService.user.victory) {
        for (let i = 0; i < this.userService.user.victory.length; i++) {
          if (this.userService.user.victory[i].victory === this.subject) {
            flag = true
          }
        }
      }
      
      if (flag) {
        this.loading = false

        for (let i = 0; i < this.userService.user.victory.length; i++) {
          if (this.userService.user.victory[i].victory == this.subject) {
            this.question = this.userService.user.victory[i].answer
            console.log(this.question);
            
          }
        }  

      }

      else {        
        this.router.navigate(['/game/victory'])
      }
    });
  }

  // getMyAnswer(id: number) {
  //   for (let i = 0; i < this.userService.user.victory.length; i++) {
  //     if (this.userService.user.victory[i].victory === this.subject) {  
  //       if (this.userService.user.victory[i].answer) {   
  //           console.log(this.userService.user.victory[i]);
            
  //           let result = this.userService.user.victory[i].answer[id - 1].answer   
  //           return result === "" ? 'На данный вопрос вы не ответили!' : result
  //       }
  //       break
  //     }
  //   }

  // }

  getCorrect() {
    for (let i = 0; i < this.userService.user.victory.length; i++) {
      if (this.userService.user.victory[i].victory == this.subject) {
        return this.userService.user.victory[i].correct
      }
    }
    
  }

  getColor(str: string, str1: string) {
    if (this.color) {
      return str === str1 ? 'green' : 'red'
    }

    return null
  }

  getIncorrect() {
    return 10 - this.getCorrect()
  }

  getBall() {
    for (let i = 0; i < this.userService.user.victory.length; i++) {
      if (this.userService.user.victory[i].victory == this.subject) {
        return this.userService.user.victory[i].ball
      }
    }
  }
}
