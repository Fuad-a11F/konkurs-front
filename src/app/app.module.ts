import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteBarModule } from './component/sitebar.module';
import { AdminModule } from './pages/admin-page/admin.module';
import { GameModule } from './pages/game-page/game-page.module';
import { MainModule } from './pages/main-page/main-page.module';
import { StartModule } from './pages/start-page/start-page.module';
import { UserService } from './shared/user.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StartModule,
    MainModule,
    GameModule,
    AdminModule,
    SiteBarModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
