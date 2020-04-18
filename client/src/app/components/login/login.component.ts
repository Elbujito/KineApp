import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private route: ActivatedRoute, private router: Router) { }

ngOnInit() {
}

}
