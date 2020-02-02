
import { Component, NgZone, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {AuthProvider} from "../../providers/auth/auth";


@IonicPage()
@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html',
})
export class GooglemapPage{
  location: any;
  i: any;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef;
  test: any = [
    {latitude: "", longitude: ""},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, public MService:AuthProvider)  {

    console.log(this.navParams.get('latitude'))
    console.log(this.navParams.get('longitude'))

this.test.push({latitude : this.navParams.get('latitude') , longitude : this.navParams.get('longitude') })

  }

  ionViewDidLoad() {
    //set google maps defaults
    this.zoom = 6;
    this.latitude = 36.8189700;
    this.longitude = 10.1657900;


    this.MService.getAllMedecin().subscribe(res => {
      console.log(res[0].location_m);
      for (var i = 0; i < JSON.stringify(res).length; i++) {
        this.location = res[i].location_m;

       // this.test.push(this.location);
        console.log(this.location);
      }
      console.log(JSON.stringify(this.test));
    });

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 6;
      });
    }
  }

}

