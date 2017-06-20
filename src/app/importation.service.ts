/**
 * Created by lechi on 13/06/2017.
 */

import {Component, Injectable} from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@Component({
  providers: [Contacts]
})

@Injectable()
export class ImportationService{

  allContacts: any;
  constructor( private contacts: Contacts) {}

  contactImportation(): Promise<any>{

    return this.contacts.find(['*']).then((contacts)=>{
      this.allContacts = contacts;
    })

  }




}
