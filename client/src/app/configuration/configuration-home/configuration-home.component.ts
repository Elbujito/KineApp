import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { User } from '../../shared/models/index';
import { AuthService } from '../../shared/services/index';

@Component({
  selector: 'app-configuration-home',
  templateUrl: './configuration-home.component.html',
  styleUrls: ['./configuration-home.component.css']
})

export class ConfigurationComponent implements OnInit {
  public user: User;

  constructor(private router: Router,private route: ActivatedRoute,
              private authService: AuthService)
  {
       this.user = this.authService.getUser();
  }

  ngOnInit() {
  }
}
