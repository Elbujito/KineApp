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

   updateBilan(bilan: Bilan): Observable<any> {
     return this.post('/bilan/update', bilan);
   }

   getBilansByPatientId(patient_id: string): Observable<Bilan[]> {
        return this.post('/bilan/findAll', patient_id);
   }

   addBilan(bilan: Bilan): Observable<any> {
        return this.post('/bilan/add', bilan);
   }

   removeBilan(bilan: Bilan): Observable<any> {
      return this.post('/bilan/delete', bilan);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getBilanById(bilan_id: string): Observable<Bilan> {
    return this.post('/bilan/find',bilan_id);
  }

   private extractData(res: Response) {
   console.log("Response");
    console.log(res);
          return res || {};
   }

    private handleError(error: any): Observable<never> {
        if (error.error) {
            const errMsg = (error.error && error.error.message)
                || (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
            return observableThrowError(errMsg);
        }
    }

       private post(route: string, data: string | Bilan): Observable<any> {
               return this.http
                   .post<Response>(environment.apiUrl + route, data)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }
}
