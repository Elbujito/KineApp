import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/index';

@Injectable()
export class LoggedOffGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        if (!this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
