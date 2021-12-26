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
  loading = false

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.subject = params['subject'].replace('_', ' ');
      let flag = false
   
      if (this.userService.user.victory) {
        for (let i = 0; i < this.userService.user.victory.info.length; i++) {
          if (this.userService.user.victory.info[i].victory === this.subject) {
            flag = true
          }
        }
      }
      
      if (flag) {
        this.loading = true
        let params1 = new HttpParams().set('subject', this.subject)
        this.http.get('http://localhost:5000/api/get_question', {params: params1})
          .subscribe(data => {
            this.question = data
            this.loading = false
            this.userService.getAnswer(this.subject).subscribe()
          })        
      }

      else {        
        this.router.navigate(['/game/victory'])
      }

    });
  }

  getMyAnswer(id: number) {
    for (let i = 0; i < this.userService.user.victory.info.length; i++) {
      if (this.userService.user.victory.info[i].victory === this.subject) {  
        if (this.userService.user.victory.info[i].answer) {   
            console.log(this.userService.user.victory.info[i]);
            
            let result = this.userService.user.victory.info[i].answer[id - 1].answer   
            return result === "" ? 'На данный вопрос вы не ответили!' : result
        }
        break
      }
    }

  }

  getCorrect() {
    for (let i = 0; i < this.userService.user.victory.info.length; i++) {
      if (this.userService.user.victory.info[i].victory == this.subject) {
        return this.userService.user.victory.info[i].correct
      }
    }
    
  }

  getColor(str: string, id: number) {
    if (this.color) {
      return str === this.getMyAnswer(id) ? 'green' : 'red'
    }

    return null
  }

  getIncorrect() {
    return 10 - this.getCorrect()
  }

  getBall() {
    for (let i = 0; i < this.userService.user.victory.info.length; i++) {
      if (this.userService.user.victory.info[i].victory == this.subject) {
        return this.userService.user.victory.info[i].ball
      }
    }
  }
}
