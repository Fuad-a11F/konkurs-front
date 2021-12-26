import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  @ViewChild('video') video: any
  loaded = false

  ngOnInit(): void { }

  play() {
    this.video.nativeElement.volume = 0.3
    this.video.nativeElement.play()
    this.loaded = false
  }

  load() {
    this.loaded = true
  }

}
