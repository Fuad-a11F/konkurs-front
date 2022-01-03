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
    this.http.post('https://fe08-films.herokuapp.com/auth', {}).subscribe((data: any) => {
      this.http.get('https://fe08-films.herokuapp.com/films', {headers: {"Autorization": "Beare " + data.token }}).subscribe(da => {
        console.log(da);
        
      })
    })

    if (localStorage.getItem('id')) {
      this.userService.getUserAgain(localStorage.getItem('id')!).subscribe(data => {
        this.loading = false
      })
    }
    else
      this.loading = false
  }
}
