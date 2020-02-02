import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";
import { AuthProvider } from '../providers/auth/auth';
import {MyApp} from "./app.component";
import {Camera} from "@ionic-native/camera";

import { HttpModule} from "@angular/http";

import {SocketIoConfig, SocketIoModule} from "ng-socket-io";
import {SearchPipe} from "../pipes/search/search";

const config:SocketIoConfig = { url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    AuthProvider

  ]
})

export class AppModule {
}
