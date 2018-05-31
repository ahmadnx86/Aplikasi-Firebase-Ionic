import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {
  // global variabel

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public eventProvider: EventProvider) {
  }

  // fungsi untuk create Event
  createEvent(
    eventName: string, eventPrice: number
    , eventDate: string, eventContact: string
  ): void {
    this.eventProvider
      .createEvent(eventName, eventPrice, eventDate, eventContact)
      .then (newEvent => {
        this.navCtrl.pop();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }

}
