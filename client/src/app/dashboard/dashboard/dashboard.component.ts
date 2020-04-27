import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }
}
