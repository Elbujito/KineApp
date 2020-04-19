import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "./auth.service";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class ErrorService {

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar) {
  }

  handleError = (error: any): Observable<any> => {
    if (error.status === 401) {
      this.authService.logOut();
      window.location.reload(true);
    } else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.snackBar.open("Something went wrong and we are working hard to ignore, I mean fix it! :) ",'x',{
          duration: 5000,
        });
      return Observable.throw(errMsg);
    }
  }
}
