import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController) {
  }

  // logout
  logout() {
    this.nav.setRoot('LoginPage');
  }
}
