import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { AuthFirebaseService, AlertService } from '../../services/index';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public isAuthenticated: Boolean;

  constructor(public authService: AuthFirebaseService, private alertService: AlertService) {
      //this.isAuthenticated = this.authService.isAuthenticated()
  }

  public userUid(): string {
    return firebase.auth().currentUser.uid;
  }

  public userEmail(): string {
    return firebase.auth().currentUser.email;
  }

  public userName(): string {
    return firebase.auth().currentUser.displayName;
  }
}
