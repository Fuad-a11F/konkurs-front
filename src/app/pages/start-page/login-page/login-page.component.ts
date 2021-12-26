import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  label_error = false
  btn_loading = false

  login(form: any) {
    this.btn_loading = true

    this.userService.getUser(form.form.value.password).subscribe((data) => {
      this.btn_loading = false
      
      if (data !== 'error') {
        if (data.isAdmin) {
          this.router.navigate(['/administrator/fuad'])
        }
        else if (!data.isAdmin) {
          this.router.navigate(['/main'])
        }
      }

      else {
        this.label_error = true
      }
    })
    
  }

  close () {
    this.label_error = false
  }

}
