import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';

import { MyApp } from './app.component';
import { Contact } from '../pages/contact/contact';
import { Importation } from '../pages/importation/importation';
import { Parametres } from '../pages/parametres/parametres';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

@NgModule({
  declarations: [
    MyApp,
    Contact,
    Importation,
    Parametres
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Contact,
    Importation,
    Parametres
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
