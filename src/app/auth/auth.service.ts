import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();
  private loggedIn: boolean = false;

  login(email: string, password: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      });
    });
  }

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      });
    });
  }

  setUser(user: any): void {
    if (user) { user.isAdmin = (user.roles.indexOf('admin') > -1); }
    if (user) { user.isTeacher = (user.roles.indexOf('profesor') > -1); }
    this.loggedIn = true;
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();

      //
      // Checking if user already has token stored
      //

      if ( !tokenVal ) {
        observer.next(null);
        return observer.complete();
      }

      //
      // Checking if user already has the info stored in window
      //

      if ( (<any>window).user ) {
        observer.next({ user: (<any>window).user });
        return observer.complete();
      }

      //
      // User has token stored (logged) but browser
      // hasn't got info about the user. Retrieving from
      // backend and store it.
      //

      this.http.get('/api/auth/me').subscribe((data: any) => {
        this.setUser(data.user);
        observer.next({ user: data.user });
        observer.complete();
      });
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }

  isLoggedIn(): Observable<boolean> {

    return Observable.create(observer => {

      //
      // If user is already logged, just confirm it
      // and return.
      //

      if ( this.loggedIn ) {
        observer.next(true);
        return observer.complete();
      }

      //
      // User appareantly is not logged so let's try
      // to log him in.
      //

      this.me().subscribe(user => {

        if ( user && user !== null ) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }

      });

    });

  }
}
