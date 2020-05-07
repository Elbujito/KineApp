import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {PathologyType} from '../../shared/models/index';

@Injectable()
export class PathologyTypesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getPathologyTypes(): Observable<PathologyType[]> {
          return this.get('/pathologyTypes');
    }

   updatePathologyType(pathologyType: PathologyType): Observable<any> {
     return this.put(pathologyType);
   }

   addPathologyType(pathologyType: PathologyType): Observable<any> {
    return this.post(pathologyType);
   }

   removePathologyType(pathologyType: PathologyType): Observable<any> {
      return this.del(pathologyType.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getPathologyTypeById(pathologyType_id: number): Observable<PathologyType> {
    return this.get('/pathologyType/'+pathologyType_id);
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

       private post(pathologyType: PathologyType): Observable<any> {
               const url = this.apiUrl+'/pathologyType';
               return this.http
                   .post<Response>(url, pathologyType)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/pathologyType/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(pathologyType: PathologyType): Observable<PathologyType> {
		  const url = this.apiUrl+'/pathologyType';
      return this.http.put<Response>(url, pathologyType)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
