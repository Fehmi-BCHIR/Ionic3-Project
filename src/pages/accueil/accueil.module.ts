import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AccueilPage} from "./accueil";

@NgModule({
  declarations: [
    AccueilPage,
  ],
  imports: [
    IonicPageModule.forChild(AccueilPage),
  ],
  entryComponents: [
    AccueilPage
  ],
  exports:[AccueilPage]
})
export class AccueilPageModule {}
