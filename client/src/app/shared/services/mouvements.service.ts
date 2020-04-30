import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Mouvement} from '../../shared/models/index';

@Injectable()
export class MouvementsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getMouvements(): Observable<Mouvement[]> {
          return this.get('/mouvements');
    }

   updateMouvement(mouvement: Mouvement): Observable<any> {
     return this.put(mouvement);
   }

   addMouvement(mouvement: Mouvement): Observable<any> {
    return this.post(mouvement);
   }

   removeMouvement(mouvement: Mouvement): Observable<any> {
      return this.del(mouvement.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getMouvementById(mouvement_id: number): Observable<Mouvement> {
    return this.get('/mouvement/'+mouvement_id);
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

       private post(mouvement: Mouvement): Observable<any> {
               const url = this.apiUrl+'/mouvement';
               return this.http
                   .post<Response>(url, mouvement)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/mouvement/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(mouvement: Mouvement): Observable<Mouvement> {
		  const url = this.apiUrl+'/mouvement';
      return this.http.put<Response>(url, mouvement)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
