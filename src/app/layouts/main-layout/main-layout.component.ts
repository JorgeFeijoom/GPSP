import { Component, OnInit, ElementRef, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { Menu, Section } from './menu';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  private userSubscription: Subscription;
  public user: any;
  public isExpanded: boolean = false;
  public menu: Menu;

  constructor(private authService: AuthService,
              private router: Router,
              private elementRef: ElementRef) { }

  ngOnInit() {

    //
    // Loading menu
    //

    this.menu = new Menu();

    // init this.user on startup
    this.authService.me().subscribe(data => {
      if ( !data ) this.user = null;
      else this.user = data.user;
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });

  }

  ngAfterViewInit() {

    //
    // Changing body background color
    //

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
