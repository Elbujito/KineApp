import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {Note} from '../../shared/models/index';

@Injectable()
export class NotesService {

  constructor(private http: HttpClient) {
  }

   updateNote(note: Note): Observable<any> {
     return this.post('/note/update', note);
   }

   getNotesByPatientId(patient_id: string): Observable<Note[]> {
        return this.post('/note/findAll', patient_id);
   }

   addNote(note: Note): Observable<any> {
        return this.post('/note/add', note);
   }

   removeNote(note: Note): Observable<any> {
      return this.post('/note/delete', note);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getNoteById(note_id: string): Observable<Note> {
    return this.post('/note/find',note_id);
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

       private post(route: string, data: string | Note): Observable<any> {
               return this.http
                   .post<Response>(environment.apiUrl + route, data)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }
}
