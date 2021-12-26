import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    this.http.get('http://localhost:5000/api/get_review')
      .subscribe(data => {
        console.log(data);
        
        this.reviews = data
        this.loading = false
      })

    let params = new HttpParams().set('id', this.userService.user.id)
    this.http.get('http://localhost:5000/api/check_leave_review', {params})
      .subscribe(data => this.checkLeaveReview = data)
  }

  leaveReview(form: any) {   
    this.btn_loading = true 
    this.success_label = true

    this.http.post('http://localhost:5000/api/add_review', {text: form.value.reviewText, 
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
