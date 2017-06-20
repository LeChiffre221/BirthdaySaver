/**
 * Created by lechi on 13/06/2017.
 */

import {Component, Injectable} from '@angular/core';
import {Facebook} from "@ionic-native/facebook";
import firebase from "firebase";

@Injectable()
export class FacebookService{

  userProfile: any = null;
  constructor( private facebook: Facebook) {}

  connexion(): Promise<any>{

    return this.facebook.login(['email']).then((response) => {
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


  }
}
