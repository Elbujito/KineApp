import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/index';
import { ChangePassword, Connector } from '../../models/index';

@Component({
    selector: 'auth-reset',
    templateUrl: 'password.component.html',
    styleUrls: ['../style.scss']
})
export class PasswordComponent implements OnInit {
    changePassword: ChangePassword;
    errorMsg: string = null;
    connectors: Connector[];

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit() {
        this.changePassword = {} as ChangePassword;
        this.authService.getConnectors().subscribe(connectors => {
            this.connectors = connectors;
            this.changePassword.connector = this.connectors[0].id;
        });
    }

    submit(): void {
        this.authService
            .changePassword(this.changePassword)
            .subscribe(
                () => this.router.navigateByUrl(this.authService.redirectUrl),
                error => (this.errorMsg = error)
            );
    }
}
