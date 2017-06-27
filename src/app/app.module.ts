import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { Importation } from '../pages/importation/importation';
import { ModalChoice } from '../pages/modal/modalChoice';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase';
import {Contacts} from "@ionic-native/contacts";


@NgModule({
  declarations: [
    MyApp,
    Importation,
    ModalChoice,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Importation,
    ModalChoice

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
