import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Subject } from './subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  /**
   * getAll
   * Retrieves subjects from backend. Different kind of
   * params are allowed.
   *
   * @param params - Query
   * @param loading - Must show main loading bar?
   */

  getAll(params?: any, loading?: string): Observable<string | any> {

    const url = '/api/subject/all';

    return this.http
      .get<any>(url, {
        params: params,
        headers: loading === 'no-loading-bar' ? new HttpHeaders({ ignoreLoadingBar: '' }) : {}
      });
  }

  /**
   * update
   * Updates the given subject.
   *
   * @param user - The given user to update
   */

  update(subject: Subject): Observable<any> {

    const url = '/api/subject/' + subject._id;

    return this.http
      .put<any>(url, subject, { responseType: 'text' as 'json' });

  }
}
