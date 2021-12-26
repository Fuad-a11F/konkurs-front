import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help-page/help/help.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistrationComponent } from './registration-page/registration/registration.component';
import { StartComponent } from './start-page.component';
import { HttpClientModule }   from '@angular/common/http';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
    {path: 'start', component: StartComponent, canActivate: [AuthGuard], children: [
        {path: '', component: MainPageComponent},
        {path: 'registration', component: RegistrationComponent},
        {path: 'login', component: LoginPageComponent},
        {path: 'help', component: HelpComponent},
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
