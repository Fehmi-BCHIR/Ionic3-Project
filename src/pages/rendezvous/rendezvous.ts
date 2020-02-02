import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {RecherchemedecinPage} from "../recherchemedecin/recherchemedecin";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-rendezvous',
  templateUrl: 'rendezvous.html',
})
export class RendezvousPage {

  dateRdv: any;
  tempsRdv: any;
  jourRdv:any;
idmedecin :any;
idpatient: any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authService: AuthProvider,
              private alertCtrl: AlertController,public formBuilder: FormBuilder) {


    console.log(this.navParams.get('id'))
    this.idmedecin= this.navParams.get('id')
    console.log(this.idmedecin)

    this.idpatient=localStorage.getItem('iduser')
    console.log(this.idpatient)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendezvousPage');
  }

  demanderdv(dateRdv,tempsRdv,jourRdv) {

    this.authService.ajoutrdv(this.idmedecin,this.idpatient,dateRdv,tempsRdv,jourRdv).subscribe(res => {
      console.log(JSON.stringify(res));
      if (res != null) {
        this.navCtrl.push('RecherchemedecinPage')
        let alert = this.alertCtrl.create({
          title: 'Succès',
          subTitle: 'RDV ajouté',
          buttons: ['Ok']
        });
        alert.present();


      }
      else {

        this.navCtrl.setRoot('RendezVousPage')
      }
    })
  }


}
