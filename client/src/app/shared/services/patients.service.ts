import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Patient} from '../../shared/models/index';

@Injectable()
export class PatientsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getAllPatients(): Observable<Patient[]> {
          return this.get('/patients');
    }

   updatePatient(patient: Patient): Observable<any> {
     return this.put(patient);
   }

   addPatient(patient: Patient): Observable<any> {
    return this.post(patient);
   }

   removePatient(patient: Patient): Observable<any> {
      return this.del(patient.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getPatientById(patient_id: number): Observable<Patient> {
    return this.get('/patient/'+patient_id);
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

       private post(patient: Patient): Observable<any> {
               const url = this.apiUrl+'/patient';
               return this.http
                   .post<Response>(url, patient)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/patient/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(patient: Patient): Observable<Patient> {
		  const url = this.apiUrl+'/patient';
      return this.http.put<Response>(url, patient)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
