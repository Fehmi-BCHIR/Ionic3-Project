import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RegisterPage} from "./register";
import {MbscModule} from "@mobiscroll/angular";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    MbscModule,
    FormsModule
  ],
  entryComponents: [
    RegisterPage
  ],
  exports:[RegisterPage]
})
export class RegisterPageModule {}
