import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService, AlertService } from '../../core/services/index';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public isAuthenticated: Boolean;
  public logoImage: string = '../../assets/img/logo.png';

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    ) {
      this.isAuthenticated = this.authService.isAuthenticated()
  }

  public userUid(): string {
    return "";//firebase.auth().currentUser.uid;
  }

  public userEmail(): string {
    return "";//firebase.auth().currentUser.email;
  }

  public userName(): string {
    return "";//firebase.auth().currentUser.displayName;
  }

  public onLogout(): void {
    this.alertService.showToaster('Logout succesful');
    //return this.authService.logout();
  }
}
