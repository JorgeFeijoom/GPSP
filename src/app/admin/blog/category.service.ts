import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Category } from './post';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {}

  /**
   * create
   * It creates a new category in database
   * 
   * @param category {any} - The given Category
   * @return author {any}
   * 
   */

  create(category: any): Observable<any> {

    const url = '/api/post/category';

    return this.http
      .post<any>(url, category);

  }


  /**
   * update
   * Updates the given category in database
   * 
   * @param category {any} - The given Category
   * @return category {any}
   */

  update(category: any): Observable<any> {

    const url = '/api/post/category/' + category._id;

    return this.http
      .put<any>(url, category);

  }


  /**
   * getAll
   * Retrieves a list of categories from
   * database.
   * 
   * @param category {any} - The given Category
   * @return category {Category[]}
   */

  getAll(params: any, loading: string): Observable<string | any> {

    const url = '/api/post/category';
    
    return this.http
      .get<any>(url, {
        params: new HttpParams().set('name', params.name),
        headers: loading === 'no-loading-bar' ? new HttpHeaders({ ignoreLoadingBar: '' }) : {}
      });

  }


 /**
   * delete
   * Removes the given category
   * 
   * @param category {any} - The given Category
   * @return category {any}
   */

  delete(id: string): Observable<any> {

    const url = '/api/post/category/' + id;

    return this.http
      .delete(url, { responseType: 'text' });
  }

}