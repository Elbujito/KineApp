import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Patient} from '../../shared/models/index';

@Injectable()
export class PatientsService {

  constructor(private http: HttpClient) {
  }

   getAllPatients(): Observable<Patient[]> {
          return this.get('/patient/all');
    }

   updatePatient(patient: Patient): Observable<any> {
     return this.post('/patient/update', patient);
   }

   addPatient(patient: Patient): Observable<any> {
        return this.post('/patient/add', patient);
   }

   removePatient(patient: Patient): Observable<any> {
      return this.post('/patient/delete', patient);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getPatientById(patient_id: string): Observable<Patient> {
    return this.post('/patient/find',patient_id);
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

       private post(route: string, data: string | Patient): Observable<any> {
               return this.http
                   .post<Response>(environment.apiUrl + route, data)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }
}
