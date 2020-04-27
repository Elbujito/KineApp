import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Bilan} from '../../shared/models/index';

@Injectable()
export class BilansService {

  constructor(private http: HttpClient) {
  }

   getAllBilans(): Observable<Bilan[]> {
          return this.get('/bilan/all');
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

   private post(route: string, data: string): Observable<any> {
           return this.http
               .post<Response>(environment.apiUrl + route, data)
               .pipe(
                   map(this.extractData),
                   catchError(this.handleError),
               );
   }

   private extractData(res: Response) {
          return res || {};
   }

    private handleError(error: any): Observable<never> {
        if (error.error) {
            const errMsg = (error.error && error.error.message)
                || (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
            return observableThrowError(errMsg);
        }
    }




}
