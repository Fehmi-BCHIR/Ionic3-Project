import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, IonicPage, Events} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {AuthProvider} from "../../providers/auth/auth";
import {RecherchemedecinPage} from "../recherchemedecin/recherchemedecin";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  formgroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(public nav: NavController, private authService: AuthProvider, public forgotCtrl: AlertController,
              public menu: MenuController, public toastCtrl: ToastController, public formbuilder: FormBuilder, public events: Events) {

    this.menu.swipeEnable(false);

    this.formgroup = formbuilder.group({
      email: ['', Validators.required, Validators.minLength(5)],
      password: ['', Validators.required, Validators.maxLength(15)]
    });
    this.email = this.formgroup.controls['email'];
    this.password = this.formgroup.controls['password'];
  }

  loginData: any = {
    email: '',
    password: ''
  };

  login(loginData) {

    this.authService.loginUser(loginData).subscribe(res => {
      ///  console.log(JSON.stringify(res));
      console.log(res.user)

      this.events.publish('us', res.user, Date.now());
      this.authService.setItem(res.user._id);
      localStorage.setItem('iduser',res.user._id)
      console.log(res.user._id)
      this.events.publish('med', '0', Date.now());

      if (res != null) {

        this.authService.getmedecin(res.user.email).subscribe(result => {
          localStorage.setItem('idmedecin',result[0]._id)
          console.log(result[0]._id)

          console.log("res login ", result.length)


             this.events.publish('med', '1', Date.now());

          console.log("res login ", result == null)
        },error2 => {

          console.log('okkkkkkkkkkkkkkkkkkkkkkkkk665')
        })

       localStorage.setItem("iduser", res.user._id);

        this.nav.setRoot('RecherchemedecinPage');


        //  localStorage.setItem('userid',res.user._id)
        //

        //localStorage.setItem('user',res.user)

      }
      else {

        this.nav.push('LoginPage');

      }

    })
  }

  // go to register page
  register() {
    this.nav.setRoot('RegisterPage');
  }

  // login and go to home page

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Mot de passe oublié?',
      message: "Entrer votre adresse email pour envoyer un mot de passe de réinitialisation.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'L\'email a été envoyé avec succès',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
