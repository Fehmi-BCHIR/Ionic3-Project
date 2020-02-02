import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {RendezvousPage} from "../rendezvous/rendezvous";
import {GooglemapPage} from "../googlemap/googlemap";


@IonicPage()
@Component({
  selector: 'page-recherchemedecin',
  templateUrl: 'recherchemedecin.html',
})
export class RecherchemedecinPage {

list:any;
term: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public restuser:AuthProvider) {
    this.restuser.getAllMedecin().subscribe(res => {
      this.list=res;
    });
  }

// this is run whenever the (ionInput) event is fired
  searchFn(ev: any) {
    this.term = ev.target.value;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecherchemedecinPage');
  }

  RDV(id){
    console.log(id)
    this.navCtrl.push('RendezvousPage' , {'id': id})
}

  medecinmap(u){
    console.log(u.location_m.latitude)
    console.log(u.location_m.longitude)

  this.navCtrl.push('GooglemapPage' ,{'latitude': u.location_m.latitude , 'longitude':u.location_m.longitude } )
}


}
