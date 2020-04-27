import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthFirebaseService } from '../services/index';

@Injectable()
export class AuthFirebaseGuard implements CanActivate {
  constructor(private authFirebaseService: AuthFirebaseService,
    private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authFirebaseService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
