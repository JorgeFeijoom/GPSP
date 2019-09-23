import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ExternalAuthor } from './post';

@Injectable()
export class AuthorService {

  constructor(private http : HttpClient) {}

  /**
   * create
   * It creates a new author in database
   * 
   * @param author {any} - The given Author
   * @return author {any}
   */

  create(author: any): Observable<any> {

    const url = '/api/post/author';

    return this.http
      .post<any>(url, author);

  }


  /**
   * update
   * Updates the given author in database
   * 
   * @param author {any} - The given Author
   * @return author {any}
   */

  update(author: any): Observable<any> {

    const url = '/api/post/author/' + author._id;

    return this.http
      .put<any>(url, author);

  }


  /**
   * getAll
   * Retrieves a list of ExternalAuthor from
   * database.
   * 
   * @param author {any} - The given Author
   * @return author {ExternalAuthor[]}
   */

  getAll(params: any, loading: string): Observable<string | ExternalAuthor[]> {

    const url = '/api/post/author';
    
    return this.http
      .get<ExternalAuthor[]>(url, {
        params: new HttpParams().set('name', params.name),
        headers: loading === 'no-loading-bar' ? new HttpHeaders({ ignoreLoadingBar: '' }) : {}
      });

  }


 /**
   * delete
   * Removes the given author
   * 
   * @param author {any} - The given Author
   * @return author {any}
   */

  delete(id: string): Observable<any> {

    const url = '/api/post/author/' + id;

    return this.http
      .delete(url, { responseType: 'text' });
  }

}