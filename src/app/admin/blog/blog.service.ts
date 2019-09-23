import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Post } from './post';

@Injectable()
export class BlogService {

  constructor(private http : HttpClient) { }

  /**
   * getAll
   * Retrieves posts from backend. Different kind of
   * params are allowed.
   * 
   * @param params - Query
   * @param loading - Must show main loading bar?
   */

  getAll(params?: any, loading?: string): Observable<string | any> {

    const url = '/api/post';
    
    return this.http
      .get<any>(url, {
        params: params,
        headers: loading === 'no-loading-bar' ? new HttpHeaders({ ignoreLoadingBar: '' }) : {}
      });
  }


  /**
   * remove
   * Removes the post given.
   * 
   * @param post - Query
   * @param loading - Must show main loading bar?
   */

  remove(id: string): Observable<any> {

    const url = '/api/post/' + id;

    return this.http
      .delete(url, { responseType: 'text' });

  }


  /**
   * create
   * Creates a new post.
   * 
   * @param post - New post data
   */

  create(post: any): Observable<any> {

    const url = '/api/post';

    return this.http
      .post<any>(url, post);

  }


  /**
   * update
   * Updates the given post.
   * 
   * @param post - The given post to update
   */

  update(post: Post): Observable<any> {

    const url = '/api/post/' + post._id;

    return this.http
      .put<any>(url, post, { responseType: 'text' as 'json' });

  }


  /**
   * createUrl
   * According to the data sent, it creates and
   * returns a well-formed URL.
   * 
   * @param article {Article} - The given Article
   * @return url {String}
   */

  createUrl (article: any): Observable<String> {

    const url = '/api/post/slug';

    return this.http
      .post<String>(url, article, {
        headers: { ignoreLoadingBar: '' }
      });
  }

}
