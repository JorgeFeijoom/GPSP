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
   * Retrieves posts from backend. Different kind of
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

  getSubject(code): Observable<any> {
    let params = new HttpParams();
    params = params.set('code', code);
    const url = '/api/subject/get';
    return this.http.get(url, { params });
  }


  /* Returns if an user is enrolled in a subject */
  enrolled(code): Observable<any> {
    const url = '/api/subject/enrolled';
    const data = {'code': code };
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }

  /* Enroll user */
  enroll(code): Observable<any> {
    const url = '/api/enroll/add';
    const data = {'codeSubject': code };
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }
}
