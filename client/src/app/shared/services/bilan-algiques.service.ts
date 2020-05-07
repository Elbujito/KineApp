import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {BilanAlgique} from '../../shared/models/index';

@Injectable()
export class BilanAlgiquesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getBilanAlgiques(): Observable<BilanAlgique[]> {
          return this.get('/bilanAlgiques');
    }

   updateBilanAlgique(bilanAlgique: BilanAlgique): Observable<any> {
     return this.put(bilanAlgique);
   }

   addBilanAlgique(bilanAlgique: BilanAlgique): Observable<any> {
    return this.post('/bilanAlgique',bilanAlgique);
   }

   addBilanAlgiques(bilanAlgiques: BilanAlgique[]): Observable<any> {
    return this.post('/bilanAlgiques',bilanAlgiques);
   }

   removeBilanAlgique(bilanAlgique: BilanAlgique): Observable<any> {
      return this.del(bilanAlgique.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getBilanAlgiqueById(bilanAlgique_id: number): Observable<BilanAlgique> {
    return this.get('/bilanAlgique/'+bilanAlgique_id);
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

       private post(route: string, bilanAlgique: BilanAlgique | BilanAlgique[]): Observable<any> {
               const url = this.apiUrl+route;
               return this.http
                   .post<Response>(url, bilanAlgique)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/bilanAlgique/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(bilanAlgique: BilanAlgique | BilanAlgique[]): Observable<BilanAlgique> {
		  const url = this.apiUrl+'/bilanAlgique';
      return this.http.put<Response>(url, bilanAlgique)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
