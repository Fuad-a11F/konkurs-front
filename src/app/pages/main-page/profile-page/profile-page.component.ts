import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    this.http.get('http://localhost:5000/api/check_leave_review', {params})
      .subscribe(data => this.checkLeaveReview = data)
  }

  openVictory() {
    if (!this.victoryShow) {
      this.userService.getVictory().subscribe(() => {
        this.victoryShow = true
      })
    }
    else {
      this.victoryShow = false
    }
  }

  openClicker() {
    if (!this.clickerShow) {
      this.userService.getClicker().subscribe(() => {
        if (this.flag) {
          this.getClickerTable(this.clicker_tabel_page)
          this.flag = false
        }
        this.clickerShow = true
      })
    }
    else {
      this.clickerShow = false
    }
  }

  getClickerTable(count: number) {
    if (this.userService.user.clicker) {
      for (let i = count; i < this.userService.user.clicker.info.length; i++) {
        if (i < count + 10) {
          this.clicker_table.push(this.userService.user.clicker.info[i])
        }
      }
    }
  }

  getClickerCount() {
    if (Array.isArray(this.userService.user.count))
      return this.userService.user.clicker.length
    return this.userService.user.clicker.count
  }

  getVictoryCount() {
    if (Array.isArray(this.userService.user.victory))
      return this.userService.user.victory.length
    return this.userService.user.victory.count
  }

  next() {
    this.clicker_tabel_page++
    this.clicker_table = []
    this.getClickerTable(this.clicker_tabel_page * 10)
  }

  checkDisabled() {
    if (this.clicker_tabel_page == Math.round(this.userService.user.clicker.info.length / 10)) {
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
    this.userService.changeIsShow(this.userService.user.isShowName).subscribe(data => {
      this.userService.user.isShowName = data
      this.success_label = true
      this.error_label_text = ''
      !data ? this.success_label_text = 'Вы перестали быть Анонимом!' : this.success_label_text = 'Вы стали Анонимом!'
      
    })
  }  

  checkPassword() {
    this.userService.checkPassword(this.old_password).subscribe(data => {
      if (data) {
        this.disabled = false
        this.error_label = false
        this.error_label_text = ''
        this.incorrectPassword_2 = false
      }
  
      else {
        this.incorrectPassword_2 = true
        this.error_label = true
        this.error_label_text = 'Пароль неверный!'
      }
    })
  }

  changePassword() {
    if (this.new_password_1 && this.new_password_2 && (this.new_password_1 === this.new_password_2)) {
      this.btn_loading_1 = true
      this.incorrectPassword_1 = false

      this.userService.changePassword(this.new_password_1).subscribe(data => {

        if (data === 'ok') {
          this.error_label = false
          this.success_label = true
          this.error_label_text = ''
          this.success_label_text = 'Пароль успешно изменен!'
          localStorage.setItem('password', this.new_password_1)
          this.new_password_1 = ''
          this.new_password_2 = ''
          this.old_password = ''
          this.disabled = true
        }

        else {
          this.error_label = true
          this.error_label_text = 'Такой пароль уже есть в системе!'
        }
      
        this.btn_loading_1 = false
      })
    }

    else {
      this.incorrectPassword_1 = true
    }
  }

  close() {
    this.error_label = false
    this.success_label = false
  }
  
  changeLogin() {
    if (this.new_login) {
      this.btn_loading_2 = true
      this.userService.changeLogin(this.new_login).subscribe(() => {
        this.btn_loading_2 = false
        this.error_label_text = ''
        this.success_label = true
        this.success_label_text = 'Логин успешно изменен!'
        this.old_password = ''
        this.new_login = ''
        this.disabled = true
      })
    }

  }

}
