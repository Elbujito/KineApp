import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable, of} from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Bilan} from '../classes/bilan';

@Injectable()
export class BilansService {

  bilanUrl = environment.apiUrl + 'bilan/';
  patientUrl = environment.apiUrl + 'patient/';

  constructor(private http: Http) {
  }

  getAllBilans(): Observable<Bilan[]> {
    return this.http.get(this.bilanUrl)
      .map(res => res.json().data.items as Bilan[]).catch(this.handleError);
  }

   getBilansByPatient(patientId): Observable<Bilan[]> {
      return this.http.get(this.patientUrl + patientId + '/bilans/')
        .map(res => res.json().data.items as Bilan[]).catch(this.handleError);
   }

    getBilanById(id): Observable<Bilan> {
       return this.http.get(this.bilanUrl + id)
         .map(res => res.json().data.items[0] as Bilan).catch(this.handleError);
    }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
