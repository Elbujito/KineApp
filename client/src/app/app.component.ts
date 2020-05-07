import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, Event as NavigationEvent} from "@angular/router";
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

constructor(private router: Router) {}

    public ngOnInit(): void {
    }

}
