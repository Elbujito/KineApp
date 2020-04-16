import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable, of} from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Patients} from '../classes/patients';

@Injectable()
export class PatientsService {

  patientsUrl = environment.apiUrl + 'patients/';

  constructor(private http: Http) {
  }

  getAllPatients(): Observable<Patients[]> {
    return this.http.get(this.patientsUrl)
      .map(res => res.json().data.items as Patients[]).catch(this.handleError);
  }

  getPatientsByBilans(patientId): Observable<Patients[]> {
    return this.http.get(this.patientsUrl + patientId + '/patients/')
      .map(res => res.json().data.items as Patients[]).catch(this.handleError);
  }


  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
