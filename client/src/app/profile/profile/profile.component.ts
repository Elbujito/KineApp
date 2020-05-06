import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../shared/services/index';
@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private authFirebaseService : AuthFirebaseService) { }

  ngOnInit() {
  }

  onLogout() {
   this.authFirebaseService.logout();
  }
}
