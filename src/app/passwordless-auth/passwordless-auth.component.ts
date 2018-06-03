import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';  
@Component({
  selector: 'passwordless-auth',
  templateUrl: './passwordless-auth.component.html',
  styleUrls: ['./passwordless-auth.component.scss']
})
export class PasswordlessAuthComponent implements OnInit {
  user;
  email: string;
  emailSent = false;
  loading = false; 

  rForm: FormGroup;
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  titleAlert = 'A valid email is required'; 
  errorMessage: string;

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, private router: Router) {
    this.rForm = fb.group({
      'email': [null, [Validators.required, Validators.pattern(this.emailPattern)]]
      // 'description': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])]
    });
  }

  ngOnInit() {
    
    this.user = this.afAuth.authState;

    // const url = this.router.url;

    // if (url.includes('signIn')) {
    //   this.loading = true;
    //   this.confirmSignIn(url);
    // }
  }
  // async sendEmailLink() {
  //   this.loading = true;
  //   const actionCodeSettings = {
  //     // Your redirect URL
  //     url: 'http://localhost:4000/login',
  //     handleCodeInApp: true
  //   };

  //   try {
  //     await this.afAuth.auth.sendSignInLinkToEmail(
  //       this.email,
  //       actionCodeSettings
  //     );
  //     window.localStorage.setItem('emailForSignIn', this.email);
  //     this.emailSent = true;
  //     this.loading = false;
  //   } catch (err) {
  //     this.errorMessage = err.message;
  //     this.loading = false;
  //   }
  // }

  // async confirmSignIn(url) {
  //   try {
  //     if (this.afAuth.auth.isSignInWithEmailLink(url)) {
  //       let email = window.localStorage.getItem('emailForSignIn');

  //       // If missing email, prompt user for it
  //       if (!email) {
  //         email = window.prompt('Please provide your email for confirmation');
  //       }

  //       // Signin user and remove the email localStorage
  //       const result = await this.afAuth.auth.signInWithEmailLink(email, url);
  //       console.log('check');
  //       console.log(result);
  //       window.localStorage.removeItem('emailForSignIn');
  //       const path = `home`;
  //       // configure auth gaurd here to pass user to dashboard
  //       this.router.navigate([path]);
  //       this.loading = false;
  //     }
  //   } catch (err) {
  //     this.errorMessage = err.message;
  //     this.loading = false;
  //   }
  // }

  logout() {
    this.loading = false;
    return this.afAuth.auth.signOut();
  }
}
