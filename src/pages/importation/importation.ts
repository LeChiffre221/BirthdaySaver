import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';


@Component({
  selector: 'page-importation',
  templateUrl: 'importation.html'
})
export class Importation {

  userFacebookStatus: any = null;
  userProfile: any = null;
  userFriendList: any = null;
  friendList: Array<{id: string, name: string}>;
  friendInformation: any = null;

  constructor(public navCtrl: NavController, private facebook: Facebook) {

  }

  facebookLogin(): void {
    console.log("Je suis dans la méthode FacebookLogin");

    this.facebook.getLoginStatus()
      .then(function(success){

        this.userFacebookStatus = success;
        console.log('IN PROMISE : '+JSON.stringify(this.userFacebookStatus))

      })
      .catch((error) => {
        console.log("Request on facebook api 'getStatus' failed : " + JSON.stringify(error));
      })

    //this.userFacebookStatus == null
    console.log('AFTER PROMISE : '+JSON.stringify(this.userFacebookStatus))

    if(this.userFacebookStatus.status != 'connected'){

      this.facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            //console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;


          })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
          });

      }).catch((error) => { console.log(error) });
    }
    console.log(this.userProfile.uid)
    this.facebookGetFriendList();

  }

  facebookGetFriendList(): void {


    this.facebook.api('/1547719825269114/friendlists', ["read_custom_friendlists"])
      .then((success) => {
        this.userFriendList = success;


        this.friendList = [];

        for(let userFriend of this.userFriendList.data){
          console.log('REPSONSE friendlists FBapi : ' + userFriend.id);
          this.facebook.api('/'+userFriend.id, ["read_custom_friendlists"])
            .then((success) => {
              this.friendInformation = success;
              console.log(JSON.stringify(success));



            })
            .catch((error) => {
              console.log("Request on facebook api failed '/id': " + JSON.stringify(error));
            })

          this.friendList.push({
            id:  userFriend.id,
            name: this.friendInformation.name
          })


        }

      })
      .catch((error) => {
        console.log("Request on facebook api failed '/id/friendlist' : " + JSON.stringify(error));
      })
  }






}
