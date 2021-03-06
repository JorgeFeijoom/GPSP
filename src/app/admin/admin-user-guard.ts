import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {

    /*
     * Only authenticated users with admin role are allowed to pass.
     * 
     * If user is not allowed, is redirected to home
     *
     */

    return this.authService.isLoggedIn().map(logged => {

      const user = (<any>window).user;

      if ( logged && user && user.isAdmin ) return true;
      else this.router.navigate(['']);
    });

  }
}
