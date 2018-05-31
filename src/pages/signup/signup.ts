import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  // global variable
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public loadingCtrl: LoadingController
    , public formBuilder: FormBuilder
    , public authProvider: AuthProvider
    , public alertCtrl: AlertController) 
  {
    //validasi form
    this.signupForm = formBuilder.group({
      email: [
        '', //menandakan tipe string
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  // fungsi untuk signup user baru
  signupUser(): void {
    //cek validasi form
    if(!this.signupForm.valid){
      console.log(`Form belum valid: ${this.signupForm.value}`);
    } else {
      // baca nilai input yg ada di form
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      // memanggil fungsi signup user di provider
      this.authProvider.signUpUser(email, password).then(
        user => { // resolve
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          })
        },
        error => { // reject
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{
                text: 'OK', role: 'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
