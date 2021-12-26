import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sitebar',
  templateUrl: './sitebar.component.html',
  styleUrls: ['./sitebar.component.scss']
})
export class SitebarComponent implements OnInit {

  constructor(private router: Router, public userService: UserService) { }

  @Input() view: any

  @ViewChild('audio') audio: any

  visibleMenu = true

  ngOnInit(): void {

  }

  info() {
    if (localStorage.getItem('info') == 'true') return true
    return false
  }

  shown() {
    localStorage.setItem('info', 'false')
  }

  logout() {
    localStorage.removeItem('id')
    this.router.navigate(['/start'])
  }

  openMenu() {
    this.visibleMenu = !this.visibleMenu
  }

}
