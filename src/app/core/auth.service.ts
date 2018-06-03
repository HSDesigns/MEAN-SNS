import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { NotifyService } from './notify.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  msg?: string;
  success?: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class AuthService {
  heroesUrl = 'http://localhost:4000/users/register';  // URL to web api
  private handleHTTPError: HandleError;
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private http: HttpClient,
    private router: Router, private notify: NotifyService, httpErrorHandler: HttpErrorHandler) {
    this.handleHTTPError = httpErrorHandler.createHandleError('AuthService');
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          // logged in, get custom user from Firestore
          // return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          return this.afAuth.authState;
        } else {
          // logged out, null
          return Observable.of(null)
        }
      })
  }
  // emailSignUp(email: string, password: string) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then(user => {
  //       return this.setUserDoc(user) // create initial user document
  //     })
  //     .catch(error => this.handleError(error));
  // }


  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider()
  //   return this.oAuthLogin(provider);
  // }
  // facebookLogin() {
  //   const provider = new firebase.auth.FacebookAuthProvider();
  //   return this.oAuthLogin(provider);
  // }
  // private oAuthLogin(provider: any) {
  //   return this.afAuth.auth
  //     .signInWithPopup(provider)
  //     .then(credential => {
  //       alert('Welcome to SNS!!!');
  //       return this.updateUserData(credential.user);
  //     })
  //     .catch(error => this.handleError(error));
  // }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
         this.router.navigate(['/home']);
         this.notify.update('Welcome To Spaces & Stories', 'success');
          // return this.updateUserData(credential); // if using firestore
      })
      .catch(error => this.handleError(error));
  }
  // Update properties on the user document
  // updateUser(user: User, data: any) {
  //   return this.afs.doc(`users/${user.uid}`).update(data)
  // }
  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        console.log(credential.user);
        return this.updateUserData(credential).subscribe((result => {
          if (!result.success) {
            this.user = null;
          }else {
            this.router.navigate(['/artist']);
          }
        }));
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }
  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
  private updateUserData(user): Observable<any>  {
    // Sets user data to firestore on login
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
   
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    }
    console.log(data);
    return this.http.post<User>(this.heroesUrl, data, httpOptions).pipe(
      catchError(this.handleHTTPError('updateUserData'))
    );
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
      this.notify.update('You Have Been Successfully Logged-Out', 'success');
    });
  }
}