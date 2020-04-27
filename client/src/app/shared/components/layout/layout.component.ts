import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';

import { AuthService, AuthFirebaseService } from '../../services/index';
import { User } from '../../models/index';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean;
    isAdmin: boolean;

    user: User;

    constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher, private service: AuthService
) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
      this.user = this.service.getUser();
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
