import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RendezvousPage } from './rendezvous';


@NgModule({
  declarations: [
    RendezvousPage,
  ],
  imports: [
    IonicPageModule.forChild(RendezvousPage),
  ],
  entryComponents: [
    RendezvousPage
  ],
  exports:[RendezvousPage]
})
export class RendezvousPageModule {}
