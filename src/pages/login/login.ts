import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // global variable
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public loadingCtrl: LoadingController
    , public formBuilder: FormBuilder
    , public authProvider: AuthProvider
    , public alertCtrl: AlertController) 
  {
    this.loginForm = formBuilder.group({
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

  // fungsi untuk login user
  loginUser(): void{
    // cek apakah form login sudah valid atau belum
    if(!this.loginForm.valid){
      console.log(`Form belum valid: ${this.loginForm.value}`);
    } else {
      // baca nilai input yg ada di form
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // mencocokkan dengan data di firebase
      this.authProvider.loginUser(email, password).then(
        authData => { // resolve
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

  //fungsi untuk membuka form signup
  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  //fungsi untuk membuka form reset password
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
