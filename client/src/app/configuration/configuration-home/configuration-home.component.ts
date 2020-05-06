import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-configuration-home',
  templateUrl: './configuration-home.component.html',
  styleUrls: ['./configuration-home.component.css']
})

export class ConfigurationComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute)
  {
  }

  ngOnInit() {
  }
}
