import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {AuthProvider} from 'ngx-auth-firebaseui';

import * as firebase from "firebase/app";

import { AuthService, AuthFirebaseService} from '../../shared/services/index';
import {
    LoginPassword,
    Connector,
    ProductInformations
} from '../../shared/models/index';

@Component({
  selector: 'app-firebase-auth',
  templateUrl: './auth-firebase.component.html',
  styleUrls: ['./auth-firebase.component.css']
})
export class AuthFirebaseComponent {
    loginPassword: LoginPassword;
    errorMsg: string = null;
    connectors: Connector[];
    productInformations: ProductInformations;
    providers = AuthProvider;

  constructor(private router: Router, private authService: AuthService, private authFirebaseService: AuthFirebaseService) {}

   ngOnInit() {
        this.loginPassword = {} as LoginPassword;

        this.authService.getConnectors().subscribe(connectors => {
            this.connectors = connectors;
            this.loginPassword.connector = this.connectors[0].id;
        });
        if (this.authService.productInformations) {
            this.productInformations = this.authService.productInformations;
        }
    }

    onSuccess() {
       let email = firebase.auth().currentUser.email;
       let uid = firebase.auth().currentUser.uid;
       let route = 'users/' + firebase.auth().currentUser.uid;
       if (! firebase.database().ref(route).child(route)) {
              firebase.database().ref(route).push({
                    email: email,
                    uid: uid
                    });
      }
      this.loginOnServer();
    }

    loginOnServer()
    {
       this.loginPassword.login = firebase.auth().currentUser.email;
       this.loginPassword.password = firebase.auth().currentUser.uid;
       this.authService.login(this.loginPassword)
       .subscribe( res => {
          this.authFirebaseService.onSuccess();
         },
         (error) => { this.errorMsg = error;
        });
    }
}
