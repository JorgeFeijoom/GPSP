import { Component, OnInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;

  constructor(private authService: AuthService,
              private elementRef: ElementRef) { }

  ngOnInit() {

    // init this.user on startup
    this.authService.me().subscribe((data: any) => {
      if ( !data ) this.user = null;
      else this.user = data.user;
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngAfterViewInit() {

    //
    // Changing body background color
    //

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f3f3';
  }

}
