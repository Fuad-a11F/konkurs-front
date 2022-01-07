import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_PATH } from 'src/app/api';
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
  win_ball: string | number = ''
  loading_modal: any = null

  ngOnInit(): void { 
    console.log(this.userService);
    
    this.http.get(`${API_PATH}/api/get_start_state`)
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
    return this.userService.user.clicker.length
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

}
