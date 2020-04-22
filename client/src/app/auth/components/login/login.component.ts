import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/index';
import {
    LoginPassword,
    Connector,
    ProductInformations
} from '../../models/index';

@Component({
    selector: 'auth-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginPassword: LoginPassword;
    loginStarted: Boolean;
    errorMsg: string = null;
    connectors: Connector[];
    productInformations: ProductInformations;

    constructor(private router: Router, private authService: AuthService) {}

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

    submit() {
    this.loginStarted = true;
        this.authService
            .login(this.loginPassword)
            .subscribe(
                () => this.router.navigateByUrl(this.authService.redirectUrl),
                error => (this.errorMsg = error)
            );
     this.loginStarted = false;
    }
}
