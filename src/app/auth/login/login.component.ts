import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  //
  // Main login object
  //

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .subscribe(data => {
      this.router.navigate(['/admin']);
    })
  }

}
