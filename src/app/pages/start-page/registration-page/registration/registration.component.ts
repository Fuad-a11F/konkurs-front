import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import PersonType from 'src/PersonCodes';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { API_PATH } from 'src/app/api';

type textLabel = {
  text: string;
  type: string;
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  type = 'Участник';
  hasAdmin = true;
  incorrectCode = false;
  incorrectPassword = false;
  btn_loading = false;

  @ViewChild('imagePerson') imagePerson: any;

  ngOnInit(): void {
    this.userService
      .checkAdmin()
      .subscribe((data: any) => (this.hasAdmin = data));
  }

  label = false;
  label_text: null | textLabel = null;

  registerUser(form: any) {
    this.incorrectPassword = false;
    this.incorrectCode = false;

    if (
      form.form.value.password1 === form.form.value.password2 &&
      PersonType[form.form.value.person] === form.form.value.code
    ) {
      this.btn_loading = true;
      this.http
        .post(`${API_PATH}/api/register_user`, {
          login: form.form.value.login,
          person: form.form.value.person,
          password: form.form.value.password1,
          image: this.imagePerson.nativeElement.src,
          type: this.type === 'Админ' ? 1 : 0,
        })
        .subscribe((data: any) => {
          this.btn_loading = false;

          if (data.type != 'error') {
            this.userService.setUser(data);
            localStorage.setItem('id', data.id);
            this.router.navigate(['/main']);
          } else {
            this.label = true;
            this.label_text = data;
          }
        });
    } else if (form.form.value.password1 !== form.form.value.password2) {
      this.incorrectPassword = true;
    } else if (PersonType[form.form.value.person] !== form.form.value.code) {
      this.incorrectCode = true;
    }
  }

  close() {
    this.label = false;
  }

  changePhoto(e: any) {
    let temp = this.imagePerson.nativeElement.src;

    if (e.target.value) {
      this.imagePerson.nativeElement.src =
        temp.slice(0, temp.lastIndexOf('/')) + '/' + e.target.value + '.jpg';
    } else {
      this.imagePerson.nativeElement.src =
        temp.slice(0, temp.lastIndexOf('/')) + '/None.gif';
    }
  }
}
