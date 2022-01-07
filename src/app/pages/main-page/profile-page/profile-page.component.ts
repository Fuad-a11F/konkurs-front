import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_PATH } from 'src/app/api';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(public userService: UserService, private http: HttpClient) { }  

  disabled = true
  old_password = ''
  new_password_1 = ''
  new_password_2 = ''
  position = ''
  new_login = ''
  modal_help: null | string = null
  modal_help_2: null | string = null

  clicker_table: any = []
  clicker_tabel_page = 0

  checkLeaveReview: any = null

  loading = true
  btn_loading_1 = false
  btn_loading_2 = false

  incorrectPassword_1 = false
  incorrectPassword_2 = false

  error_label = false
  success_label = false
  error_label_text = ''
  success_label_text = ''

  clickerShow = false
  victoryShow = false

  flag = true

  ngOnInit(): void { 
    if (!localStorage.getItem('modal')) {
      localStorage.setItem('modal', 'Yes')
    }    

    if (!localStorage.getItem('review_1')) {
      localStorage.setItem('review_1', 'Yes')
    }
    
    this.modal_help = localStorage.getItem('modal')
    this.modal_help_2 = localStorage.getItem('review_1')

    this.userService.getPosition(localStorage.getItem('id')!)
      .subscribe(data => {
        this.position = data.toString()
        this.loading = false
      })

    let params = new HttpParams().set('id', this.userService.user.id)
    this.http.get(`${API_PATH}/api/check_leave_review`, {params})
      .subscribe(data => this.checkLeaveReview = data)
  }

  openVictory() {
    if (!this.victoryShow) {
      this.victoryShow = true
    }
    else {
      this.victoryShow = false
    }
  }

  openClicker() {
    if (!this.clickerShow) {
        if (this.flag) {
          this.getClickerTable(this.clicker_tabel_page)
          this.flag = false
        }
        this.clickerShow = true
    }
    else {
      this.clickerShow = false
    }
  }

  getClickerTable(count: number) {
    if (this.userService.user.clicker) {
      for (let i = count; i < this.userService.user.clicker.length; i++) {
        if (i < count + 10) {
          this.clicker_table.push(this.userService.user.clicker[i])
        }
      }
    }
  }

  next() {
    this.clicker_tabel_page++
    this.clicker_table = []
    this.getClickerTable(this.clicker_tabel_page * 10)
  }

  checkDisabled() {
    if (this.clicker_tabel_page == Math.round(this.userService.user.clicker.length / 10)) {
      return true
    }

    return false
  }

  prev() {
    this.clicker_tabel_page--
    this.clicker_table = []
    this.getClickerTable(this.clicker_tabel_page * 10)
  }

  modalOff() {
    localStorage.setItem('modal', 'No')
    this.modal_help = 'No'
  }
  
  modalOff_2() {
    localStorage.setItem('review_1', 'No')
    this.modal_help_2 = 'No'
  }
  
  changeShow() {
    this.userService.changeIsShow().subscribe(data => {
      this.userService.user.isShowName = data
      this.success_label = true
      this.error_label_text = ''
      !data ? this.success_label_text = 'Вы перестали быть Анонимом!' : this.success_label_text = 'Вы стали Анонимом!'
      
    })
  }  

  close() {
    this.error_label = false
    this.success_label = false
  }

}
