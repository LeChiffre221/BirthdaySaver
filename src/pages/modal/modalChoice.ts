import {Component, ViewChild} from '@angular/core';
import {NavController, ModalController, NavParams} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ModalForm } from  "../modal/modalForm";
import {SendSMSService} from "../../app/sendSMS.service";
import { Importation } from '../importation/importation';



//import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-importation',
  templateUrl: 'modalChoice.html',
  providers: [SMS, SendSMSService]

})

export class ModalChoice{

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  contact: any;
  formOpen: boolean = false




  constructor(public navCtrl: NavController, params: NavParams,  private sendSMSService: SendSMSService,
              public modalCtrl: ModalController) {
    this.contact = params.get('contact');
  }

  sendSMS(contact): void{
    this.sendSMSService.sendSMS(contact);
  }

  formContact(contact): void{

    this.formOpen = true;
  }

  validForm(): void{
    this.nav.setRoot(Importation);
  }





}
