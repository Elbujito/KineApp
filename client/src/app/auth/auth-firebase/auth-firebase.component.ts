import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {AuthProvider} from 'ngx-auth-firebaseui';

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
        this.loginPassword.login = 'admin';
        this.loginPassword.password = 'admin';
    }

    onSuccess() {
      this.authService.login(this.loginPassword)
        .subscribe(
        error => (this.errorMsg = error)
        );
      this.authFirebaseService.onSuccess();
    }
}
