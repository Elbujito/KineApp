import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, Event as NavigationEvent} from "@angular/router";
import {EventsService} from "./dashboard/services/events.service";
declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

constructor(private router: Router, private eventsService: EventsService) {
    router.events.forEach((event: NavigationEvent) => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
        let data = {'event_type': 'page_hit', 'event_data': event.urlAfterRedirects};
        this.eventsService.emitEvent(data).subscribe(()=>{});
      }
    });
    }

    ngOnInit()
    {
    }
}
