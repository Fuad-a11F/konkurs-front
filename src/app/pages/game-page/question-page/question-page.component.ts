import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { API_PATH } from 'src/app/api';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public userService: UserService
  ) {}

  subject = '';
  question: any = null;
  howManyCorrect: any = 0;
  result = false;

  loading = true;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.subject = params['subject'].replace('_', ' ');
      let params1 = new HttpParams().set('subject', this.subject);
      this.http
        .get(`${API_PATH}/api/get_question`, { params: params1 })
        .subscribe((data) => (this.question = data));
    });
  }

  checkResult(form: any) {
    this.result = true;
    this.userService
      .updateVictory(this.subject, form)
      .subscribe((data: any) => {
        this.howManyCorrect = data.count;
        this.loading = false;
      });
  }
}
