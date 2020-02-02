import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MedecinPage} from "./medecin";
import {FormsModule} from "@angular/forms";
import {MbscModule} from "@mobiscroll/angular";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    MedecinPage,
  ],
  imports: [
    IonicPageModule.forChild(MedecinPage),
    MbscModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDBPKlDwMQL00AasUkdn11-NM6W2Tszl3Q",
      libraries: ["places"]
    }),
  ],
  entryComponents: [
    MedecinPage
  ],
  exports:[MedecinPage]
})
export class MedecinPageModule {}
