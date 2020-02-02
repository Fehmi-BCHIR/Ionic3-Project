import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecherchemedecinPage } from './recherchemedecin';
import {SearchPipe} from "../../pipes/search/search";

@NgModule({
  declarations: [
    RecherchemedecinPage,
    SearchPipe
  ],
  imports: [
    IonicPageModule.forChild(RecherchemedecinPage),
  ],
})
export class RecherchemedecinPageModule {}
