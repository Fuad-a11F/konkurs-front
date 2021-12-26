import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { GameComponent } from "./game-page.component";
import { GameRoutingModule } from "./game-routing.module";
import { ClickerPageComponent } from './clicker-page/clicker-page.component';
import { VictoryPageComponent } from './victory-page/victory-page.component';
import { HttpClientModule } from "@angular/common/http";
import { SiteBarModule } from "src/app/component/sitebar.module";
import { QuestionPageComponent } from './question-page/question-page.component';
import { FormsModule } from "@angular/forms";
import { AnswerPageComponent } from './answer-page/answer-page.component';

@NgModule({
    declarations: [  
        GameComponent,
        ClickerPageComponent,
        VictoryPageComponent,
        QuestionPageComponent,
        AnswerPageComponent
    ],
    imports: [
        BrowserModule,
        GameRoutingModule, 
        HttpClientModule,
        SiteBarModule,
        FormsModule
    ],
    providers: [],
    bootstrap: []
})
export class GameModule {}