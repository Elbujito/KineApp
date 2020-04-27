import { Component, OnInit } from '@angular/core';
import { AuthService, AuthFirebaseService } from '../../shared/services/index';
@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: AuthService, private authFirebaseService : AuthFirebaseService) { }

  ngOnInit() {
  }

  onLogout() {
   this.service.logout();
   this.authFirebaseService.logout();
  }
}
