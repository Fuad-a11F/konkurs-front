import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_PATH } from 'src/app/api';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit {

  constructor(private http: HttpClient, public userService: UserService) { }

  reviews: any = []
  notShow = false
  loading = true
  btn_loading = false

  success_label = false

  checkLeaveReview: any = null

  ngOnInit(): void {
    this.http.get(`${API_PATH}/api/get_review`)
      .subscribe(data => {

        this.reviews = data
        this.loading = false
      })

    let params = new HttpParams().set('id', this.userService.user.id)
    this.http.get(`${API_PATH}/api/check_leave_review`, {params})
      .subscribe(data => this.checkLeaveReview = data)
  }

  leaveReview(form: any) {   
    console.log(form.value);
    
    this.btn_loading = true 
    this.success_label = true

    this.http.post(`${API_PATH}/api/add_review`, {text: form.value.reviewText, 
                                                            isShow: this.userService.user.isShowName ? 1 : 0, 
                                                            user_id: localStorage.getItem('id')})
      .subscribe(data => {
        this.btn_loading = false
        this.reviews.push(data)
        this.checkLeaveReview = true
      })
  }

  close() {
    this.success_label = false
  }
}
