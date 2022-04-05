import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { API_PATH } from '../api';

@Injectable({ providedIn: 'root' })
export class UserService {
  user: any = {};

  constructor(public http: HttpClient) {}

  getUser(password: string) {
    let params = new HttpParams().set('password', password);
    return this.http.get(`${API_PATH}/api/login_user`, { params }).pipe(
      tap((data: any) => {
        if (data != 'error') {
          console.log(API_PATH);

          this.user = data;
          localStorage.setItem('id', data.id);
        }
      })
    );
  }

  getUserAgain(id: string) {
    let params = new HttpParams().set('id', id);
    return this.http.get(`${API_PATH}/api/login_user_again`, { params }).pipe(
      tap((data: any) => {
        if (data != 'error') {
          this.user = data;
        }
      })
    );
  }

  setUser(data: any) {
    this.user = data;
  }

  checkAdmin() {
    return this.http.get(`${API_PATH}/api/check_admin`);
  }

  addClicker(ball: number) {
    return this.http
      .post(`${API_PATH}/api/add_clicker`, {
        ball,
        id: localStorage.getItem('id'),
      })
      .pipe(
        tap((data: any) => {
          this.user.clicker.push(data);
          this.user.ball += data.ball;
        })
      );
  }

  getPosition(id: string) {
    return this.http.get(`${API_PATH}/api/get_position/` + id);
  }

  getWinners() {
    return this.http.get(`${API_PATH}/api/get_winners`);
  }

  changeIsShow() {
    return this.http.put(`${API_PATH}/api/change_is_show`, {
      id: localStorage.getItem('id'),
    });
  }

  addVictory(victory: string) {
    return this.http
      .post(`${API_PATH}/api/add_victory`, {
        victory,
        id: localStorage.getItem('id'),
      })
      .pipe(
        tap((data: any) => {
          this.user.victory.push({
            ball: 0,
            correct: 0,
            victory: data.victory,
          });
        })
      );
  }

  updateVictory(subject: string, form: any) {
    return this.http
      .put(`${API_PATH}/api/check_victory_answer`, {
        form: form.value,
        id: localStorage.getItem('id'),
        subject,
      })
      .pipe(
        tap((data: any) => {
          this.user.ball -= data.ball;
          for (let i = 0; i < this.user.victory.length; i++) {
            if (this.user.victory[i].victory === subject) {
              this.user.victory[i]['answer'] = data.answer;
              this.user.victory[i].correct = data.count;
              this.user.victory[i].ball = data.ball;
              break;
            }
          }
        })
      );
  }
}
