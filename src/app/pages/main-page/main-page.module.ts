import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScorePageComponent } from './score-page/score-page.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { WinPageComponent } from './win-page/win-page.component';
import { FormsModule } from '@angular/forms';
import { SiteBarModule } from 'src/app/component/sitebar.module';
import { CountBallPipe } from 'src/app/pipes/CountBall.pipe';
import { PresentsComponent } from './presents/presents.component';
import { ButtonComponent } from 'src/app/component/button/button.component';


@NgModule({
  declarations: [
    ScorePageComponent,
    GamesPageComponent,
    HelpPageComponent,
    MainComponent,
    ProfilePageComponent,
    ReviewPageComponent,
    WinPageComponent,
    CountBallPipe,
    PresentsComponent,
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    FormsModule,
    SiteBarModule
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }
