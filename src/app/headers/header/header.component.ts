import { Component, OnInit, Input } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { Menu } from '../../layouts/admin-layout/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  public dropdown: Menu;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
