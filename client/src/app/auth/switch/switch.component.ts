import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/index';

@Component({
    selector: 'auth-switch',
    templateUrl: './switch.component.html'
})
export class SwitchComponent {
    constructor(private router: Router, private authService: AuthService) {}

    switchUser() {
        this.authService.logout();
        this.authService.redirectUrl = this.router.url;
        this.router.navigate(['/home']);
    }
}
