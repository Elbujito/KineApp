import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable, of} from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Patient} from '../classes/patient';

@Injectable()
export class PatientsService {

  patientUrl = environment.apiUrl + 'patient/';

  constructor(private http: Http) {
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get(this.patientUrl)
      .map(res => res.json().data.items as Patient[]).catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
