/**
 * Created by lechi on 13/06/2017.
 */

import {Component, Injectable} from '@angular/core';
import { SMS } from '@ionic-native/sms';


@Component({
  providers: [SMS]
})

@Injectable()
export class SendSMSService{

  constructor( private sms: SMS) {}

  sendSMS(contact): void{

    this.sms.send(contact.phoneNumbers[0].value, 'Joyeux anniversaire '+contact.displayName, {})
      .then(() => {
        alert("SMS envoyé à "+contact.displayName);
      },()=> {
        alert("Echec envoi SMS")
      });


  }
}
