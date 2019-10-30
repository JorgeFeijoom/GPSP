import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.me().subscribe(data => {
      if ( !data ) this.user = null;
      else this.user = data.user;
    });
  }

}
