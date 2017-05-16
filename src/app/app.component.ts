import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Contact } from '../pages/contact/contact';
import { Importation } from '../pages/importation/importation';
import { Parametres } from '../pages/parametres/parametres';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Contact;

  //Tableau permettant de lister toutes mes pages afin de lister dans le menu
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    //Utiliser par le ngFor dans le menu
    this.pages = [
      { title: 'Contact', component: Contact },
      { title: 'Importation', component: Importation },
      { title: 'Paramètres', component: Parametres }

    ];

    firebase.initializeApp({
      apiKey: "AIzaSyDBCsMJIsKV4i0YteeAcRJ0tDJVFVqISRw",
      authDomain: "birthdaysaver.firebaseapp.com",
      databaseURL: "https://birthdaysaver.firebaseio.com",
      storageBucket: "birthdaysaver.appspot.com",
      messagingSenderId: "788615401656"
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.push(page.component);
    this.nav.setRoot(page.component);
  }
}
