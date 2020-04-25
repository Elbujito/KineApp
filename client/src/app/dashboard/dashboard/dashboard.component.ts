import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../core/services/index';
import { User } from '../../shared/models/index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    user: User;

    constructor(private service: AuthService) {
    }

    ngOnInit(): void {
        this.user = this.service.getUser();
    }

}
