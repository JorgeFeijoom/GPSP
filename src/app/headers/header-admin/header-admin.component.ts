import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { Menu } from '../../layouts/admin-layout/menu';

@Component({
  selector: 'header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  @Input() user: any = {};

  public dropdown: Menu;

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {

    //
    // Loading dropdown menu
    //

    this.dropdown = new Menu();
  }


  logout(): void {
    this.authService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
