import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Muscle} from '../../shared/models/index';

@Injectable()
export class MusclesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getMuscles(): Observable<Muscle[]> {
          return this.get('/muscles');
    }

   updateMuscle(muscle: Muscle): Observable<any> {
     return this.put(muscle);
   }

   addMuscle(muscle: Muscle): Observable<any> {
    return this.post(muscle);
   }

   removeMuscle(muscle: Muscle): Observable<any> {
      return this.del(muscle.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getMuscleById(muscle_id: number): Observable<Muscle> {
    return this.get('/muscle/'+muscle_id);
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

       private post(muscle: Muscle): Observable<any> {
               const url = this.apiUrl+'/muscle';
               return this.http
                   .post<Response>(url, muscle)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/muscle/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(muscle: Muscle): Observable<Muscle> {
		  const url = this.apiUrl+'/muscle';
      return this.http.put<Response>(url, muscle)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
