import {Component, ViewChild} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { ImportationService } from '../../app/importation.service';
import { Facebook } from '@ionic-native/facebook';
import { Contacts } from '@ionic-native/contacts';
import firebase from 'firebase';
import { FacebookService } from "../../app/facebook.service";
import { ModalChoice } from  "../modal/modalChoice";


//import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-importation',
  templateUrl: 'importation.html',
  providers: [Contacts, ImportationService, FacebookService]
})

export class Importation {

  @ViewChild(Nav) nav: Nav;

  userProfile: any = null;
  userFriendList: any = null;
  friendList: Array<{ id: string, name: string }>;
  friendInformation: any = null;
  //myObservable: Observable<Array<number>>;

  allContacts: any = null


  constructor(public navCtrl: NavController,  private importationService: ImportationService,
              private facebookService: FacebookService, public modalCtrl: ModalController) {
  }

  showModalChoice(contact): void{
    let contactModal = this.modalCtrl.create(ModalChoice, {contact: contact});
    contactModal.present();
  }

  contactImportation(): void{
    let p = this.importationService.contactImportation();
    p.then(() => {
      this.allContacts = this.importationService.allContacts;
    })
  }

  facebookImportation(): void {
    let p = this.facebookService.connexion();

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
