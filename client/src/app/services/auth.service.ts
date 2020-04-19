import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/catch';
import {User} from "../classes/user";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {
  authUrl = environment.apiUrl + 'auth/';
  static selfUser: User;
  static isSuperuser: boolean;
  static token: string;

  selfUserChange: Subject<User> = new Subject<User>();

  constructor(private http: Http) {
    this.selfUserChange.subscribe((user) => {
      if (user === undefined) {
        AuthenticationService.selfUser = undefined;
        AuthenticationService.isSuperuser = undefined;
      } else {
        AuthenticationService.selfUser = user;
        AuthenticationService.isSuperuser = user.is_admin;
      }
    });
  }

  authenticate(data): Observable<any> {
    return this.http.post(this.authUrl + "api-token-auth/", data)
      .map(res => res.json()).catch(AuthenticationService.handleError);
  }

  private static handleError(error: any) {
    let errMsg = (error.json().non_field_errors) ? error.json().non_field_errors :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  setToken(token: string) {
    AuthenticationService.token = token;
    localStorage.setItem('auth_token', token);
  }

  setUser(user: User) {
    this.selfUserChange.next(user);
  }


   logOut() {
    localStorage.removeItem('auth_token');
    this.selfUserChange.next(undefined);
  }
}
