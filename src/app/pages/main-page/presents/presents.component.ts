import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-presents',
  templateUrl: './presents.component.html',
  styleUrls: ['./presents.component.scss']
})
export class PresentsComponent implements OnInit {

  constructor(public userService: UserService, private http: HttpClient) { }

  isPresent: any = false
  presents: any = []

  modal_help: any = null
  checkLeaveReview: any = null

  btn_loading_1 = false
  btn_loading_2 = false
  btn_loading_3 = false

  send_label = false
  send_label_text = ''

  loading = true

  present_page: any = []
  presents_page_number = 0

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/check_present/' + localStorage.getItem('id'))
      .subscribe(data => {
        this.isPresent = data

        if (!data) {
          this.http.get('http://localhost:5000/api/get_all_present')
            .subscribe((data: any) => {
              this.loading = false
              this.presents = data
              this.present_page = data.slice(this.presents_page_number, this.presents_page_number + 6)
            })
        }

        this.loading = false
      })

    if (!localStorage.getItem('review_2')) {
      localStorage.setItem('review_2', 'Yes')
    }

    this.modal_help = localStorage.getItem('review_2')

    let params1 = new HttpParams().set('id', this.userService.user.id)
    this.http.get('http://localhost:5000/api/check_leave_review', {params: params1})
      .subscribe(data => this.checkLeaveReview = data)
  }

  path(pathfile: string) {
    return `../../../../assets/${pathfile}`
  }

  prev() {
    this.presents_page_number -= 6
    this.present_page = this.presents.slice(this.presents_page_number, this.presents_page_number + 6)
  }

  checkDisabled() {
    if (this.present_page.length < this.presents_page_number) {
      return true
    }

    return false
  }

  next() {
    this.presents_page_number += 6
    this.present_page = this.presents.slice(this.presents_page_number, this.presents_page_number + 6)
    this.checkDisabled()
  }

  customPresent(form: any) {  
    this.btn_loading_1 = true

    this.http.post('http://localhost:5000/api/add_present', 
                                        {present: form.value.customPresentText, user_id: localStorage.getItem('id')})
      .subscribe(() => {
        this.send_label = true
        this.btn_loading_1 = false
        this.isPresent = true
        this.send_label_text = 'Успешно отправлено!'
      })
  }

  choosePresent(form: any) {
    this.btn_loading_2 = true

    this.http.post('http://localhost:5000/api/add_present', 
                                    {present: form.value.present, user_id: localStorage.getItem('id')})
      .subscribe(() => {
        this.btn_loading_2 = false
        this.isPresent = true
        this.send_label = true
        this.send_label_text = 'Успешно отправлено!'
      })
  }

  deleteAndChooseAgain() {
    this.btn_loading_3 = true
    this.http.delete('http://localhost:5000/api/delete_present/' + localStorage.getItem('id'))
      .subscribe(() => {
        this.isPresent = false
        this.btn_loading_3 = false
        this.send_label = true
        this.send_label_text = 'Успешно удалено!'
        this.loading = true
        this.http.get('http://localhost:5000/api/get_all_present')
          .subscribe((data: any) => {
            this.presents = data
            this.loading = false
            this.present_page = data.slice(this.presents_page_number, this.presents_page_number + 6)
          })
      })
  }

  modalOff() {
    localStorage.setItem('review_2', 'No')
    this.modal_help = 'No'
  }

  close() {
    this.send_label = false
  }

}
