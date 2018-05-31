import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  // global variabel
  public eventListRef: Reference;

  constructor() {
    console.log('Hello EventProvider Provider');
    firebase.auth().onAuthStateChanged(user => {
      this.eventListRef = firebase.database().ref(`userProfile/${user.uid}/eventlist`);
    });
  }

  //fungsi untuk membuat event baru
  createEvent(
    eventName: string, eventPrice: number
    , eventDate: string, eventContact: string
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName, price: eventPrice * 1
      , date: eventDate, contact: eventContact
    });
  }

  //fungsi untuk melihat semua event
  getEventList(): Reference{
    return this.eventListRef;
  }

  //fungsi untuk melihat detail event
  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }

}
