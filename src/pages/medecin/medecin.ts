import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';

import { NgZone } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


@IonicPage()
@Component({
  selector: 'page-medecin',
  templateUrl: 'medecin.html',
})
export class MedecinPage {

  //map
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

  //camera
  public photos: any;
  public base64Image: string;
  public fileImage: string;
  public responseData: any;
  public response: any;
  public images: any;
  userData = {user_id: "", token: "", imageB64: ""};

  //medecin
    gouvernorat: any;
    specialite: any ;
   /* longitude: any ;
    latitude: any ;*/
    cnam:any;
    adresse:any;
    _id: any ;

  constructor(public navCtrl: NavController, public events: Events , public navParams: NavParams, private authService: AuthProvider,
              private storage:Storage,private camera : Camera,private alertCtrl : AlertController,public fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {


    this.authService.getItem().then( val => {
      this._id=val ;
      console.log( 'test'+ this._id)

    })

    this.reactForm = fb.group({

      cnam: ['', Validators.required],
      specialite: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      adresse: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],

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
    cnam: {
      required: 'Cnam required',
    },
    gouvernorat: {
      required: 'Gouvernorat required',
    },
    adresse: {
      required: 'Adresse required',
    },
    longitude: {
      required: 'Longitude required'
    },
    latitude: {
      required: 'Latitude  required',
    },
    specialite: {
      required: 'Specialité required',
    },

  };

  registermedc(gouvernorat,cnam,specialite,adresse) {
    this.templSubmitted = true;
    if (this.templForm && this.templForm.valid && this.thanksPopup) {

      console.log(gouvernorat)
      console.log(cnam)
      console.log(this.longitude)
      console.log(this.latitude)
      console.log(specialite)
      console.log(adresse)
      console.log(this._id)
      this.authService.registermedecin(gouvernorat,cnam,this.longitude,this.latitude,specialite,adresse, this._id).subscribe(res => {
        console.log(JSON.stringify(res));
        if (res != null) {



          let alert = this.alertCtrl.create({
            title: 'Inscription médecin validée !',
            subTitle: 'votre profil  a été mise à jour avec succès!',
            buttons: ['OK']
          });
          alert.present();


        }
        else {
          this.navCtrl.setRoot('MedecinPage')
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
      text: 'Inscription médecin validée',
      handler: 'set'
    }]
  };


  ngOnInit() {
    this.photos = [];
  }



/*  ajoutermedecin(gouvernorat,cnam,longitude,latitude,specialite) {
    console.log(this._id)

    this.authService.registermedecin(gouvernorat,cnam,longitude,latitude,specialite, this._id).subscribe(res => {
      console.log(JSON.stringify(res));
      if (res != null) {
        let alert = this.alertCtrl.create({
          title: 'Inscription médecin validée !',
          subTitle: 'votre profil médecin a été mise à jour avec succès!',
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        this.navCtrl.setRoot('MedecinPage')
      }
    })
  }*/


//camera
  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Sure you want to delete this photo? There is NO undo!",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Agree clicked");
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }

  takePhoto() {
    console.log("coming here");

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.sendData(imageData);
      },
      err => {
        console.log(err);
      }
    );
  }

  sendData(imageData) {
    this.userData.imageB64 = imageData;
    this.userData.user_id = "1";
    this.userData.token = "222";
    console.log(this.userData);
    this.authService.postData(this.userData, "userImage").then(
      result => {
        this.responseData = result;
      },
      err => {
        // Error log
      }
    );
  }

  getImages(){
    this.userData.user_id = "1";
    this.userData.token = "222";
    this.authService.postData(this.userData, "getImages").then(
      result => {
        this.response = result;
        this.images = this.response.imageData;
        console.log(this.images.imageData);
      },
      err => {
        console.log("error");
      }
    );
  }

  ionViewDidLoad() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 36.8189700;
    this.longitude = 10.1657900;


    //create search FormControl
    this.searchControl = new FormControl();

     //set curr

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
          console.log(this.latitude)
          this.longitude = place.geometry.location.lng();
          console.log(this.longitude)
          this.zoom = 12;
        });
      });
    });
  }
}


