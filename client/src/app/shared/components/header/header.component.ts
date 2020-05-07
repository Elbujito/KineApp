import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from "firebase/app";

import { AuthFirebaseService} from '../../services/index';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor( private route: ActivatedRoute,public router: Router,
               private authFirebaseService: AuthFirebaseService ) {

  }

  public onLoginClicked()
  {
	  if(firebase.auth().currentUser)
    {
		  this.authFirebaseService.onSuccess();
    }
    else
    {
      this.router.navigate(['login']);
    }
  }
}
