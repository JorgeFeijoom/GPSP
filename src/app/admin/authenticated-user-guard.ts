import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class OnlyAuthenticatedUsersGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  /*
   * Only authenticated users are allowed to pass.
   * We don't check roles, only state.
   * 
   * If user is not allowed, is redirected to home
   *
   */

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoggedIn().map(logged => {

      const user = (<any>window).user;

      if ( logged ) return logged;
      else this.router.navigate(['']);
    });

  }
}
