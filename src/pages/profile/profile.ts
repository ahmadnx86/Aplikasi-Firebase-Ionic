import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  // global variabel
  public userProfile: any;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public authProvider: AuthProvider
    , public profileProvider: ProfileProvider) {
  }

  //fungsi untuk logout
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshoot => {
        this.userProfile = userProfileSnapshoot.val();
      });
  }

}
