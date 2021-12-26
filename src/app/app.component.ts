import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private http: HttpClient) {}

  loading: any = true

  ngOnInit() {    
    if (localStorage.getItem('id')) {
      this.userService.getUserAgain(localStorage.getItem('id')!).subscribe(data => {
        this.loading = false
      })
    }
    else
      this.loading = false
  }
}
