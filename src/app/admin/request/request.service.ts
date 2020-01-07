import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient ) { }

  /* Get All requests of user */
  getAllRequests(): Observable<any> {
    const url = '/api/request/getall';
    return this.http.get(url, {});
  }
}
