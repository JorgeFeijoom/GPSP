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

  /*getMySubjects(params?: any, loading?: string): Observable<string | any> {
    const url = '/api/subject/mysubjects';

    return this.http
      .get<any>(url, {
        params: params,
        headers: loading === 'no-loading-bar' ? new HttpHeaders({ ignoreLoadingBar: '' }) : {}
      });
  }*/

  getMySubjects(): Observable<any> {
    const url = '/api/subject/mysubjects';
    return this.http
      .post<any> (url,
        { headers: {}, responseType: 'text' as 'json' }
      );
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

  /* Remove enroll user */
  remove(code): Observable<any> {
    const url = '/api/enroll/remove';
    const data = {'codeSubject': code };
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }

  getSubjectsFromIds(ids): Observable<any> {
    const url = '/api/subject/getfromids';
    const data = {'ids': ids};
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }

  /* Create software request */
  createRequest(request): Observable<any> {
    const url = '/api/request/add';
    const data = request;
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }

  /* Remove request */
  removeRequest(code): Observable<any> {
    const url = '/api/request/remove';
    const data = {'codeSubject': code };
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }

  /* Get request of user */
  getRequest(): Observable<any> {
    const url = '/api/request/get';
    return this.http.get(url, {});
  }
}
