import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';




import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import {Observable} from "rxjs/Observable";

import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';
import { Contact } from '../contact/contact';



@Component({
  selector: 'page-importation',
  templateUrl: 'importation.html',
  providers: [Contacts, SMS]
})

export class Importation {

  @ViewChild(Nav) nav: Nav;

  userProfile: any = null;
  userFriendList: any = null;
  friendList: Array<{ id: string, name: string }>;
  friendInformation: any = null;
  myObservable: Observable<Array<number>>;

  allContacts: any = null


  constructor(public navCtrl: NavController, private facebook: Facebook, private contacts: Contacts, private sms: SMS) {


  }

  contactImportation(): void{

    this.contacts.find(['*']).then((contacts)=>{
      console.log(JSON.stringify(contacts[0]));
      console.log(contacts[0].displayName);
      this.allContacts = contacts;
    })

  }

  sendSMS(contact): void{
    console.log(contact.phoneNumbers[0].value);

    this.sms.send(contact.phoneNumbers[0].value, 'helloWorld', {})
      .then(() => {
        alert("SMS envoyé")
      },()=> {
        alert("Echec envoi SMS")
      });


  }


  facebookLogin(): void {

    let p = this.facebook.login(['email']).then((response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      return firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          this.userProfile = success;
          return this.userProfile;
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
        })

    }).catch((error) => {
      console.log(error)
    });


    /*p.then(() => {
      this.facebookGetFriendList();
    })*/

  }
  /*
  METHODE DE RÉCUPERATION DES AMIS FACEBOOK IMPOSSIBLE A CAUSE DE LA POLITIQUE DE CONFIDENTIALITÉ DE FACEBOOK
  facebookGetFriendList(): void {

    //providerData[0]
    console.log('object ME : ' + JSON.stringify(this.userProfile));

    this.facebook.api('/' + this.userProfile.uid + '/friends', ['user_friends'])
      .then((success) => {
        this.userFriendList = success;

        console.log('Friends List :' + JSON.stringify(this.userFriendList));
        this.friendList = [];

        this.myObservable = new Observable(observer => {

          this.userFriendList.data.forEach((friend) => {

            console.log(friend.id);

            this.facebook.api(friend.id+"/", ["public_profile", "user_birthday"])
             .then((success) => {
               this.friendInformation = success;
               console.log('Ami : ' + JSON.stringify(this.friendInformation));

               observer.next(friend.id);
             })


          })
        })

        this.myObservable.subscribe();



      })
      .catch((error) => {
        console.log("Request on facebook api failed '/id': " + JSON.stringify(error));
      });

  }*/
}
