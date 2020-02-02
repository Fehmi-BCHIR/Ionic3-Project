import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  profils: any[]=[];
  nom:string='';
  prenom:string='';
  email:string='';
  password:string='';
  id:any;
  newpassword:string
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest:AuthProvider,public alertCtrl: AlertController) {
console.log("keyyyy ",this.rest.getItem());

this.id=localStorage.getItem("iduser");
    this.getProfil()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  getProfil(){
console.log(this.id)
    this.rest.getProfils(this.id)
      .subscribe(res => {

        console.log(res)

        this.nom= res["nom"];
        this.prenom=res['prenom'];
        this.email=res['email'];


      })
  }

   updateProfil(id,nom,prenom,email,password,newpassword) {
    console.log(this.id)
    console.log(nom)
    console.log(prenom)
    console.log(email)

     console.log(this.password)
     console.log(this.newpassword)
  this.rest.updateProfils(id,nom,prenom,email,password,newpassword)

      .subscribe(res => {
        console.log(res)
          this.getProfil()

      let alert = this.alertCtrl.create({
        title: 'Update Profil!',
         subTitle: 'votre profil a été modifié avec succès!',
        buttons: ['OK']
        });
        alert.present();


         }, (err) => {
           console.log(err);
        }
     );
 }
}
