import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  note: string = "Description :";
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

  Dossier(){
    let alert = this.alertCtrl.create({
      title: 'Compte rendu  validée !',
      subTitle: 'votre compte rendu  a été ajouté avec succès!',
      buttons: ['OK']
    });
    alert.present();
  }
}
