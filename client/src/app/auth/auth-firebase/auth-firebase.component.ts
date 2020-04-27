import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService, AuthFirebaseService} from '../../core/services/index';
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
    loginStarted: Boolean;
    errorMsg: string = null;
    connectors: Connector[];
    productInformations: ProductInformations;

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
    this.loginStarted = true;
        this.authService
            .login(this.loginPassword)
            .subscribe(
                //this.router.navigateByUrl(this.authService.redirectUrl),
                error => (this.errorMsg = error)
            );
     this.loginStarted = false;
     this.authFirebaseService.onSuccess();
    }
}
