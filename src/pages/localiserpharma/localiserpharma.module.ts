import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocaliserpharmaPage } from './localiserpharma';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    LocaliserpharmaPage,
  ],
  imports: [
    IonicPageModule.forChild(LocaliserpharmaPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDBPKlDwMQL00AasUkdn11-NM6W2Tszl3Q",
      libraries: ["places"]
    }),
  ],
})
export class LocaliserpharmaPageModule {}
