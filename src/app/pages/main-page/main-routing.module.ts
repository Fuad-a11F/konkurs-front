import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { KonkursGuard } from 'src/app/shared/konkurs-guard.service';
import { GamesPageComponent } from './games-page/games-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { MainComponent } from './main-page.component';
import { PresentsComponent } from './presents/presents.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { WinPageComponent } from './win-page/win-page.component';


const routes: Routes = [
    {path: 'main', component: MainComponent, canActivate: [KonkursGuard], children: [
        {path: '', component: GamesPageComponent},
        {path: 'help', component: HelpPageComponent},
        {path: 'score', component: ScorePageComponent},
        {path: 'profile', component: ProfilePageComponent},
        {path: 'review', component: ReviewPageComponent},
        {path: 'score/wins', component: WinPageComponent},
        {path: 'presents', component: PresentsComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
