import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {BilanArticulaire} from '../../shared/models/index';

@Injectable()
export class BilanArticulairesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getBilanArticulaires(): Observable<BilanArticulaire[]> {
          return this.get('/bilanArticulaires');
    }

   updateBilanArticulaire(bilanArticulaire: BilanArticulaire): Observable<any> {
     return this.put(bilanArticulaire);
   }

   addBilanArticulaire(bilanArticulaire: BilanArticulaire): Observable<any> {
    return this.post('/bilanArticulaire',bilanArticulaire);
   }

   addBilanArticulaires(bilanArticulaires: BilanArticulaire[]): Observable<any> {
    return this.post('/bilanArticulaires',bilanArticulaires);
   }

   removeBilanArticulaire(bilanArticulaire: BilanArticulaire): Observable<any> {
      return this.del(bilanArticulaire.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getBilanArticulaireById(bilanArticulaire_id: number): Observable<BilanArticulaire> {
    return this.get('/bilanArticulaire/'+bilanArticulaire_id);
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

       private post(route: string, bilanArticulaire: BilanArticulaire | BilanArticulaire[]): Observable<any> {
               const url = this.apiUrl+ route;
               return this.http
                   .post<Response>(url, bilanArticulaire)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/bilanArticulaire/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(bilanArticulaire: BilanArticulaire): Observable<BilanArticulaire> {
		  const url = this.apiUrl+'/bilanArticulaire';
      return this.http.put<Response>(url, bilanArticulaire)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
