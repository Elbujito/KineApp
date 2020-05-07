import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Pathology} from '../../shared/models/index';

@Injectable()
export class PathologiesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getPathologies(): Observable<Pathology[]> {
          return this.get('/pathologies');
    }

   updatePathology(pathology: Pathology): Observable<any> {
     return this.put(pathology);
   }

   addPathology(pathology: Pathology): Observable<any> {
    return this.post(pathology).pipe(
           map(this.extractData),
           catchError(this.handleError)
      );
   }

   removePathology(pathology: Pathology): Observable<any> {
      return this.del(pathology.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getPathologyById(pathology_id: number): Observable<Pathology> {
    console.log("getPathologyById",pathology_id);
    return this.get('/pathology/'+pathology_id);
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

       private post(pathology: Pathology): Observable<any> {
               const url = this.apiUrl+'/pathology';
               return this.http
                   .post<Response>(url, pathology)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/pathology/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(pathology: Pathology): Observable<Pathology> {
		  const url = this.apiUrl+'/pathology';
      return this.http.put<Response>(url, pathology)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
