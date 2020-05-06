import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {AuthProvider} from 'ngx-auth-firebaseui';

import * as firebase from "firebase/app";

import { AuthFirebaseService} from '../../shared/services/index';

@Component({
  selector: 'app-firebase-auth',
  templateUrl: './auth-firebase.component.html',
  styleUrls: ['./auth-firebase.component.css']
})
export class AuthFirebaseComponent {
    errorMsg: string = null;
    providers = AuthProvider;

  constructor(private router: Router, private authFirebaseService: AuthFirebaseService) {}

   ngOnInit() {
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
      this.authFirebaseService.onSuccess();
    }
}
