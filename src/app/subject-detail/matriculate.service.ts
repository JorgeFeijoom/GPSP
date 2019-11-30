import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculateService {

  constructor(private http: HttpClient) { }

  matriculate(subjectCode, accessCode): Observable<any> {
    const url = '/api/matriculate/add';
    const data = {'subjectCode': subjectCode, 'accessCode': accessCode};
    return this.http
      .post<any> (url, data,
        { headers: {}, responseType: 'text' as 'json' }
      );
  }
}
