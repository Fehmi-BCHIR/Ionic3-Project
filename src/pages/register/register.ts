import {Component, ViewChild} from "@angular/core";
import {AlertController, IonicPage, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {AuthProvider} from "../../providers/auth/auth";
import {AccueilPage} from "../accueil/accueil";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MbscDatetimeOptions} from "@mobiscroll/angular";


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  nom: any;
  prenom: any;
  email: any;
  password: any;
  tel: any;
  sexe: any;
  dateNaissance: any;
  _id: any;


  constructor(public nav: NavController, private authService: AuthProvider,public fb: FormBuilder,public alertCtrl:AlertController) {

    this.reactForm = fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],



    });
  }


  formSettings = {
    lang: 'fr',
    theme: 'material'
  };

  // Reactive Form

  reactForm: FormGroup;
  reactSubmitted: boolean = false;

  getErrorState(field: string) {
    var ctrl = this.reactForm.get(field);
    return ctrl.invalid && this.reactSubmitted;
  }

  registerReact() {
    this.reactSubmitted = true;
    if (this.reactForm.valid && this.thanksPopup) {
      this.thanksPopup.instance.show();
    }
  };


  // Template Driven Form

  @ViewChild('templForm')
  templForm: any;
  templSubmitted: boolean = false;
  //gender: string = '';


  getErrorMessage(field: string, form: string) {
    var formCtrl = form === 'react' ? this.reactForm : this.templForm.control,
      message = '';
    if (formCtrl) {
      var ctrl = formCtrl.get(field);
      if (ctrl && ctrl.errors) {
        for (var err in ctrl.errors) {
          if (!message && ctrl.errors[err]) {
            message = this.errorMessages[field][err];
          }
        }
      }
    }
    return message;
  }

  errorMessages = {
    nom: {
      required: 'Nom required',
      minlength: 'Has to be at least 2 characters'
    },
    prenom: {
      required: 'Prenom required',
      minlength: 'Has to be at least 2 characters'
    },
    sexe: {
      required: 'Préférence required'
    },
    email: {
      required: 'Email address required',
      email: 'Invalid email address'
    },
    password: {
      required: 'Password required',
      minlength: 'At least 6 characters required'
    },
    tel: {
      required: 'Telephone required',
      minlength: 'At least 8 characters required'
    },
    dateNaissance: {
      required: 'DateNaissance required',

    }
  }

  registerTempl(nom,prenom,email,password,tel,sexe,dateNaissance) {
    this.templSubmitted = true;
    if (this.templForm && this.templForm.valid && this.thanksPopup) {
      this.authService.registerUser(nom, prenom, email, password, tel, sexe, dateNaissance,this._id).subscribe(res => {
        console.log(JSON.stringify(res)
        );
        if (res != null) {
          let alert = this.alertCtrl.create({
            title: 'Inscription validée !',
            subTitle: 'votre profil a été crée avec succès!',
            buttons: ['OK']
          });
          alert.present();
          this.nav.setRoot('LoginPage')
        }
        else {
          this.nav.setRoot('RegisterPage')
        }
      })

    }
  };

  @ViewChild('thanks')
  thanksPopup: any;

  widgetSettings: any = {
    theme: 'material',
    display: 'center',
    focusOnClose: false,
    buttons: [{
      text: 'Inscription validée',
      handler: 'set'
    }]
  };





  ajouterpatient(nom, prenom, email, password, tel, sexe, dateNaissance) {
    //console.log(this._id)
    this.authService.registerUser(nom, prenom, email, password, tel, sexe, dateNaissance,this._id).subscribe(res => {
      console.log(JSON.stringify(res)
      );
      if (res != null) {
        this.nav.setRoot('AccueilPage')
      }
      else {
        this.nav.setRoot('RegisterPage')
      }
    })
  }


  // go to login page
  login() {
    this.nav.setRoot('LoginPage');
  }

}
