import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  scoreVisible: any = null
  countUser = 0
  players: any = []
  loading = true

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/get_score')
      .subscribe((data: any) => {
        this.loading = false 

        this.scoreVisible = true
        this.players = data.data.sort((a: any, b: any) => b.ball - a.ball)
        this.countUser = data.count
      })
  }

}
