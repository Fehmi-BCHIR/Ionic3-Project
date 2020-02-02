import {Component, ViewChild} from "@angular/core";
import {Platform, Nav, Events} from "ionic-angular";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {GooglemapPage} from "../pages/googlemap/googlemap";
import {RecherchemedecinPage} from "../pages/recherchemedecin/recherchemedecin";
import {ProfilPage} from "../pages/profil/profil";
import {LocaliserpharmaPage} from "../pages/localiserpharma/localiserpharma";
import {TraiterRdvPage} from "../pages/traiter-rdv/traiter-rdv";
import {AuthProvider} from "../providers/auth/auth";
import {MedecinPage} from "../pages/medecin/medecin";


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  appMenuItems: Array<MenuItem>;
  user: any;
  nom: any;
  prenom: any;
  email: any;
  test: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public keyboard: Keyboard,
              public events: Events,
              public auth: AuthProvider) {
    this.initializeApp();

    events.subscribe('us', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);

      this.user = user;
      console.log(this.user.nom);
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.email = user.email
    });



    events.subscribe('med', (med, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`

       console.log("med",med)
       if(med==="1")  {

         this.appMenuItems = [
           // {title: 'Home', component: 'HomePage', icon: 'home'},



           {title: 'Chat', component: 'ChatPage', icon: 'chatbubbles'},
           //{title: 'ChatRoom', component: 'ChatRoomPage', icon: 'chatbubbles'},

           {title: 'Traiter RDV', component: 'TraiterRdvPage', icon: 'people'},


         ];


       }

       if(med==="0"){

         this.appMenuItems = [

           // {title: 'Home', component: 'HomePage', icon: 'home'},
           // {title: 'Medecin', component: 'MedecinPage', icon: 'person'},
           /* {title: 'Médecin Map', component: 'GooglemapPage', icon: 'pin'},*/
           {title: 'Pharmacie Map', component: 'LocaliserpharmaPage', icon: 'pin'},
           {title: 'Chat', component: 'ChatPage', icon: 'chatbubbles'},
           // {title: 'ChatRoom', component: 'ChatRoomPage', icon: 'chatbubbles'},
           {title: 'Recherche Medecin', component: 'RecherchemedecinPage', icon: 'search'},
           {title: ' Profil', component: 'ProfilPage', icon: 'person'},
           /* {title: 'RendezVous', component: 'RendezvousPage', icon: 'people'},*/
           // {title: 'Traiter RDV', component: 'TraiterRdvPage', icon: 'people'},
         ];




       }
    });










  }

  initializeApp() {

    this.platform.ready().then(() => {

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout1() {

    console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    //
    this.events.unsubscribe('user:created');

    this.nav.setRoot('LoginPage');
  }

  passermedecin() {


        this.nav.setRoot('MedecinPage')

     /// } else {

        /// localStorage.setItem('userid',res[0]._id)

       // this.events.publish('userid', res[0]._id, Date.now());

       // this.nav.setRoot('TraiterRdvPage')



      ///}




  }
}
