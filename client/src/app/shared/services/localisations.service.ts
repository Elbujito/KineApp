import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Localisation} from '../../shared/models/index';

@Injectable()
export class LocalisationsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getLocalisations(): Observable<Localisation[]> {
          return this.get('/localisations');
    }

   updateLocalisation(localisation: Localisation): Observable<any> {
     return this.put(localisation);
   }

   addLocalisation(localisation: Localisation): Observable<any> {
    return this.post(localisation);
   }

   removeLocalisation(localisation: Localisation): Observable<any> {
      return this.del(localisation.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getLocalisationById(localisation_id: number): Observable<Localisation> {
    return this.get('/localisation/'+localisation_id);
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

       private post(localisation: Localisation): Observable<any> {
               const url = this.apiUrl+'/localisation';
               return this.http
                   .post<Response>(url, localisation)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/localisation/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(localisation: Localisation): Observable<Localisation> {
		  const url = this.apiUrl+'/localisation';
      return this.http.put<Response>(url, localisation)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
