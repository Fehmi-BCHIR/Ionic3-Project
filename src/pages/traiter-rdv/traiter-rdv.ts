import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-traiter-rdv',
  templateUrl: 'traiter-rdv.html',
})
export class TraiterRdvPage {
  list:any [] = [];
  idmedecin : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restrdv:AuthProvider,public alertCtrl:AlertController) {

    this.idmedecin=localStorage.getItem('idmedecin')
    console.log("iddddddddd : ",this.idmedecin)

    this.restrdv.getrdv().subscribe(res => {
       console.log(res['length'])
      for ( var i=0 ; i< JSON.stringify(res).length ; i++){
        console.log(res[i].idmedecin)
        if(res[i].idmedecin ==  this.idmedecin){
          console.log(res[i])
          this.list.push(res[i])
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TraiterRdvPage');
  }
  compterendu(){
    this.navCtrl.push("DocumentsPage")
  }

  AnnulerRDV(){
    let alert = this.alertCtrl.create({
      title: 'Rendez-vous  annulé !',
      buttons: ['OK']
    });
    alert.present();
  }
}
