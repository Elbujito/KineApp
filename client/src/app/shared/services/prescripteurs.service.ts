import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Prescripteur} from '../../shared/models/index';

@Injectable()
export class PrescripteursService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getPrescripteurs(): Observable<Prescripteur[]> {
          return this.get('/prescripteurs');
    }

   updatePrescripteur(prescripteur: Prescripteur): Observable<any> {
     return this.put(prescripteur);
   }

   addPrescripteur(prescripteur: Prescripteur): Observable<any> {
    return this.post(prescripteur);
   }

   removePrescripteur(prescripteur: Prescripteur): Observable<any> {
      return this.del(prescripteur.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getPrescripteurById(prescripteur_id: number): Observable<Prescripteur> {
    return this.get('/prescripteur/'+prescripteur_id);
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

       private post(prescripteur: Prescripteur): Observable<any> {
               const url = this.apiUrl+'/prescripteur';
               return this.http
                   .post<Response>(url, prescripteur)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/prescripteur/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(prescripteur: Prescripteur): Observable<Prescripteur> {
		  const url = this.apiUrl+'/prescripteur';
      return this.http.put<Response>(url, prescripteur)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
