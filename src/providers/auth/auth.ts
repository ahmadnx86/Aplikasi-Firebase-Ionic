import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  //fungsi untuk login
  loginUser(email: string, password: string): Promise<void> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // fungsi cek uid

  //fungsi untuk signup
  signUpUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => { // resolve
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => { // catch
        console.error(error);
        throw new Error(error);
      });
  }

  //fungsi reset password
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase.database()
      .ref(`/UserProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }
}
