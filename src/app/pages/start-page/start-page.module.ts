import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SiteBarModule } from 'src/app/component/sitebar.module';

import { HelpComponent } from './help-page/help/help.component';
import { RegistrationComponent } from './registration-page/registration/registration.component';
import { StartComponent } from './start-page.component';
import { RegistrationRoutingModule } from './start-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    HelpComponent,
    StartComponent,
    LoginPageComponent,
    MainPageComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    RegistrationRoutingModule,
    HttpClientModule,
    FormsModule,
    SiteBarModule,
  ],
  providers: [],
  bootstrap: [],
})
export class StartModule {}
