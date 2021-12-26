import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from '../pages/main-page/main-routing.module';
import { RegistrationRoutingModule } from '../pages/start-page/start-routing.module';
import { SitebarComponent } from './sitebar/sitebar.component';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { LabelComponent } from './label/label.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    SitebarComponent,
    ButtonComponent,
    ModalComponent,
    LabelComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RegistrationRoutingModule,
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [],
  exports: [SitebarComponent, ButtonComponent, ModalComponent, LabelComponent, LoaderComponent]
})
export class SiteBarModule { }
