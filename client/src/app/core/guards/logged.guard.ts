import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/index';

@Injectable()
export class LoggedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        return this.authService.isAuthenticated() || this.redirect(url);
    }

    private redirect(url: string): boolean {
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        if (this.authService.token) {
            this.authService.removeToken();
        }
        return false;
    }
}
