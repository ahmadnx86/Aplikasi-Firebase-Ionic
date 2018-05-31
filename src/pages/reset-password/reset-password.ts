import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Alert } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  // variable global
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public authProvider: AuthProvider
    , public alertCtl: AlertController
    , public formBuilder: FormBuilder) {
      // validasi form
      this.resetPasswordForm = formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.required])
        ]
      });
  }

  // fungsi reset password
  resetPassword(): void{
    // cek apakah form login sudah valid atau belum
    if(!this.resetPasswordForm.valid){
      console.log(`Form belum valid: ${this.resetPasswordForm.value}`);
    } else {
      // baca nilai input yg ada di form
      const email = this.resetPasswordForm.value.email;

      // call fungsi password
      this.authProvider.resetPassword(email).then(
        user => {
          const alert: Alert = this.alertCtl.create({
            message: 'Cek email anda untuk reset password',
            buttons: [{
              text: 'OK', role: 'cancel'
              , handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          alert.present();
        },
        error => {
          const alertError: Alert = this.alertCtl.create({
            message: error.message,
            buttons: [{
              text: 'OK', role: 'cancel'
            }]
          });
          alertError.present();
        }
      )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
