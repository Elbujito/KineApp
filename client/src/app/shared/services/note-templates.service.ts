import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {NoteTemplate} from '../../shared/models/index';

@Injectable()
export class NoteTemplatesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
	  this.apiUrl = environment.apiUrl;
  }

   getNoteTemplates(): Observable<NoteTemplate[]> {
          return this.get('/noteTemplates');
    }

   updateNoteTemplate(noteTemplate: NoteTemplate): Observable<any> {
     return this.put(noteTemplate);
   }

   addNoteTemplate(noteTemplate: NoteTemplate): Observable<any> {
    return this.post(noteTemplate);
   }

   removeNoteTemplate(noteTemplate: NoteTemplate): Observable<any> {
      return this.del(noteTemplate.id);
   }

  private get(route: string): Observable<any> {
          return this.http.get<Response>(environment.apiUrl + route).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
   }

  getNoteTemplateById(noteTemplate_id: number): Observable<NoteTemplate> {
    return this.get('/noteTemplate/'+noteTemplate_id);
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

       private post(noteTemplate: NoteTemplate): Observable<any> {
               const url = this.apiUrl+'/noteTemplate';
               return this.http
                   .post<Response>(url, noteTemplate)
                   .pipe(
                       map(this.extractData),
                       catchError(this.handleError),
                   );
       }

		private del (id: number): Observable<any> {
		  const url = this.apiUrl+'/noteTemplate/'+id;
		  return this.http.delete(url)
			.pipe(
			map(this.extractData),
       catchError(this.handleError),
       );
		}

		private put(noteTemplate: NoteTemplate): Observable<NoteTemplate> {
		  const url = this.apiUrl+'/noteTemplate';
      return this.http.put<Response>(url, noteTemplate)
        .pipe(
        map(this.extractData),
          catchError(this.handleError),
       );
    }
}
