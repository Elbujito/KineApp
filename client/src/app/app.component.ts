import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, Event as NavigationEvent} from "@angular/router";
import {EventsService} from "./dashboard/services/events.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

constructor(private router: Router, private eventsService: EventsService) {}

    ngOnInit()
    {
    }
}
