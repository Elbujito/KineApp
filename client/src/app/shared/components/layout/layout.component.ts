import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
import { LinkMenuItem } from 'ngx-auth-firebaseui';

import { AuthService, AuthFirebaseService, AlertService } from '../../services/index';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean;
    links: LinkMenuItem[];
    home: any;

    constructor(private router: Router,
        private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef,
        private service: AuthService, private authFirebaseService : AuthFirebaseService,
        private alertService: AlertService
) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
       this.links = [
          {icon: 'home', text: 'Home', callback: this.home},
        ];
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    onLogout() {
       this.service.logout();
       this.authFirebaseService.logout();
       this.showToaster("Logout...");
    }

    showToaster(message: string)
    {
      this.alertService.showToaster(message);
    }
}
