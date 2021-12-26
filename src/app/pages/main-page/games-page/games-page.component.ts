import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {

  constructor(public userService: UserService, private http: HttpClient) { }
  
  gameIsCan: any = null
  finishText = ''
  loading = true
  open_fortuna = false
  win_ball: string | number = ''
  loading_modal: any = null

  ngOnInit(): void { 
    console.log(this.userService);
    
    this.http.get('http://localhost:5000/api/get_start_state')
    .subscribe((data: any) => {
      if (data.start && !data.finish) {
        this.gameIsCan = data
      }

      else if (data.start && data.finish) {
        this.gameIsCan = false
        this.finishText = 'Конкурс уже завершен!'
      }

      else if (!data.start && !data.finish) {
        this.gameIsCan = false
      }

      this.loading = false

    })
  }

  getVictoryLength() {
    if (Array.isArray(this.userService.user.victory))
      return this.userService.user.victory.length
    return this.userService.user.victory.count
  }

  getClickerLength() {
    if (Array.isArray(this.userService.user.clicker))
      return this.userService.user.clicker.length
    return this.userService.user.clicker.count
  }

  getClickerBall() {
    if (Array.isArray(this.userService.user.clicker)) {

        let result = 0
    
        this.userService.user.clicker.forEach((item: any) => result += item.ball)

        return result.toString()

    }

    return this.userService.user.clicker.ball ?? 0
  }

  getVictoryBall() {
    if (Array.isArray(this.userService.user.victory)) {

      let result = 0
  
      this.userService.user.victory.forEach((item: any) => result += item.ball)

      return result.toString()

    }

    return this.userService.user.victory.ball ?? 0
  }

  openFortuna() {    
    this.loading_modal = true
    this.open_fortuna = true
    
    if (this.userService.user.canFortune) {
      this.http.put('http://localhost:5000/api/fortuna_unavailable', {id: localStorage.getItem('id'),
                                                                      ball: this.CountBall()})
        .subscribe((data: any) => {
          this.win_ball = data
          this.userService.user.ball += data
          this.loading_modal = false
        })
    }

    else if (!this.userService.user.canFortune) {
      this.open_fortuna = true
    }

  }

  CountBall(): number {
    let balls = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100, -110, -120, -130, -140, -150, -160, -170, -180, -190, -200, -210]
    
    return balls[Math.round(Math.random() * 40) - 1] ?? 10
  }

  closeFortune(flag: boolean) {
    this.open_fortuna = false

    if (flag) {
      this.userService.user.canFortune = false
    }
  }

}
