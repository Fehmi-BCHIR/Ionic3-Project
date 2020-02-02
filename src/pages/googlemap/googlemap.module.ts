import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GooglemapPage } from './googlemap';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [

    GooglemapPage,
  ],
  imports: [
    IonicPageModule.forChild(GooglemapPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDBPKlDwMQL00AasUkdn11-NM6W2Tszl3Q",
      libraries: ["places"]
    }),
  ],
})
export class GooglemapPageModule {}
