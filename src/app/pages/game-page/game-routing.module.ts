import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game-page.component';
import { ClickerPageComponent } from './clicker-page/clicker-page.component';
import { VictoryPageComponent } from './victory-page/victory-page.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { KonkursGuard } from 'src/app/shared/konkurs-guard.service';


const routes: Routes = [
    {path: 'game', component: GameComponent, canActivate: [KonkursGuard], children: [
        {path: 'clicker', component: ClickerPageComponent},
        {path: 'victory', component: VictoryPageComponent},
        {path: 'answer/:subject', component: AnswerPageComponent},
        {path: 'question/:subject', component: QuestionPageComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
