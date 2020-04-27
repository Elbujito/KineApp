import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { PhoneNumber } from '../../shared/models/index';
import { WindowService, AuthFirebaseService, AlertService } from '../../core/services/index';

@Component({
  selector: 'app-phone-signin',
  templateUrl: './phone-signin.component.html',
  styleUrls: ['./phone-signin.component.css']
})
export class PhoneSigninComponent implements OnInit {
  phoneNumber = new PhoneNumber()
  isAuthenticated: string;

  token: string;
  windowRef: any;
  verificationCode: string;
  currentUser: any;

  constructor(private win: WindowService,
              private router: Router,
              private authFirebaseService: AuthFirebaseService,
              private alertService: AlertService) {
      this.isAuthenticated = this.authFirebaseService.isAuthenticated()
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
          this.windowRef.confirmationResult = result;
          this.alertService.showToaster('Login code is send');
      })
      .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
        .then((result) => {
          const currentUser = result.user;
        })
        .then(response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
          .then(
              (token: string) => this.token = token
          );
          this.alertService.showToaster('Login code is entered');
        })
    .catch( error => console.log(error, 'Incorrect code entered?'));
  }
}
