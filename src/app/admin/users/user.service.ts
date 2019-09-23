import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http : HttpClient) { }

  /**
   * getAll
   * Retrieves users from backend. Different kind of
   * params are allowed.
   * 
   * @param params - Query
   * @param loading - Must show main loading bar?
   */

  getAll(params?: any, loading?: string): Observable<string | any> {

    const url = '/api/user';
    
    return this.http
      .get<any>(url, {
        params: params,
        headers: loading === 'no-loading-bar' ? new HttpHeaders({ ignoreLoadingBar: '' }) : {}
      });
  }


  /**
   * remove
   * Removes the user given.
   * 
   * @param user - Query
   * @param loading - Must show main loading bar?
   */

  remove(id: string): Observable<any> {

    const url = '/api/user/' + id;

    return this.http
      .delete(url, { responseType: 'text' });

  }


  /**
   * create
   * Creates a new user.
   * 
   * @param user - New user data
   */

  create(user: any): Observable<any> {

    const url = '/api/user/new';

    return this.http
      .post<any>(url, user);

  }


  /**
   * update
   * Updates the given user.
   * 
   * @param user - The given user to update
   */

  update(user: User): Observable<any> {

    const url = '/api/user/' + user._id;

    return this.http
      .put<any>(url, user, { responseType: 'text' as 'json' });

  }


  /**
   * updatePassword
   * Updates the given user.
   * 
   * @param id - The id from the  given user to update
   * @param passwordForm - Password and check for sending a notification
   *                       to the given user.
   */

  updatePassword(id: string, passwordForm: any): Observable<any> {

    const url = '/api/user/' + id + '/password';

    return this.http
      .put<any>(url, passwordForm, { responseType: 'text' as 'json' });

  }

}
