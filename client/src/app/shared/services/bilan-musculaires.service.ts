import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {BilanMusculaire} from '../../shared/models/index';

@Injectable()
export class BilanMusculairesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getBilanMusculaires(): Observable<BilanMusculaire[]> {
          return this.get('/bilanMusculaires');
    }

   updateBilanMusculaire(bilanMusculaire: BilanMusculaire): Observable<any> {
     return this.put(bilanMusculaire);
   }

   addBilanMusculaire(bilanMusculaire: BilanMusculaire): Observable<any> {
    return this.post('/bilanMusculaire', bilanMusculaire);
   }

   addBilanMusculaires(bilanMusculaires: BilanMusculaire[]): Observable<any> {
    return this.post('/bilanMusculaires', bilanMusculaires);
   }

   removeBilanMusculaire(bilanMusculaire: BilanMusculaire): Observable<any> {
      return this.del(bilanMusculaire.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getBilanMusculaireById(bilanMusculaire_id: number): Observable<BilanMusculaire> {
    return this.get('/bilanMusculaire/'+bilanMusculaire_id);
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

       private post(route: string, bilanMusculaire: BilanMusculaire | BilanMusculaire[]): Observable<any> {
               const url = this.apiUrl+route;
               return this.http
                   .post<Response>(url, bilanMusculaire)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/bilanMusculaire/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(bilanMusculaire: BilanMusculaire): Observable<BilanMusculaire> {
		  const url = this.apiUrl+'/bilanMusculaire';
      return this.http.put<Response>(url, bilanMusculaire)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
