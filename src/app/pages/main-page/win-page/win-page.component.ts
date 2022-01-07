import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_PATH } from 'src/app/api';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-win-page',
  templateUrl: './win-page.component.html',
  styleUrls: ['./win-page.component.scss']
})
export class WinPageComponent implements OnInit {

  constructor(public userService: UserService, private http: HttpClient) { }

  winners: any = []
  modal = false
  password = ''
  checkLeaveReview: any = null
  modal_help: any = null
  loading = true

  ngOnInit(): void {
    this.userService.getWinners().subscribe(data => {
      this.winners = data
      this.loading = false
      console.log(data);
      
    }) 

    if (!localStorage.getItem('review_3')) {
      localStorage.setItem('review_3', 'Yes')
    }

    this.modal_help = localStorage.getItem('review_3')

    let params1 = new HttpParams().set('id', this.userService.user.id)
    this.http.get(`${API_PATH}/api/check_leave_review`, {params: params1})
      .subscribe(data => this.checkLeaveReview = data)

  }

  download() {
    this.checkPassword(this.winners[0].id).subscribe(data => {
      if (data) {
        window.open(`https://api-server-13.herokuapp.com/api/download?name=${this.winners[0].name}`)
      }
    })
  }

  
  modalOff() {
    localStorage.setItem('review_3', 'No')
    this.modal_help = 'No'
  }
  

  checkPassword(id: string) {
    let params = new HttpParams().set('password', this.password).set('id', id)
    return this.http.get(`${API_PATH}/api/check_password`, {params})
  }

  
}
