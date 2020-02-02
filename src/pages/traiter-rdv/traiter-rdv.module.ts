import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TraiterRdvPage } from './traiter-rdv';


@NgModule({
  declarations: [
    TraiterRdvPage,
  ],
  imports: [
    IonicPageModule.forChild(TraiterRdvPage),
  ],
  entryComponents: [
    TraiterRdvPage
  ],
  exports:[TraiterRdvPage]
})
export class TraiterRdvPageModule {}
