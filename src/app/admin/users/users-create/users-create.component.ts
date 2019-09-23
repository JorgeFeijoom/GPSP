import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';

import { UserService }  from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  //
  // Mode: create || edit
  //

  mode: string = 'create';

  //
  // Permits
  //

  permits: string[] = ['', 'admin'];

  //
  // Main user object
  //

  userForm = this.fb.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    send_email: [false],
    roles: ['']
  });

  //
  // Must show password?
  //

  isPasswordHidden: boolean = true;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private user: UserService,
              private dialog: MatDialogRef<UsersCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    //
    // Loading proper mode: 'create' || 'edit'
    //

    if ( this.data && this.data.user ) {
      this.userForm.addControl('_id', this.fb.control(''));
      this.userForm.reset(this.data.user);
      this.userForm.get('roles').setValue(this.data.user.roles[0]);
      this.mode = 'edit';
    }
    else
      this.mode = 'create';

  }


  /**
   * togglePassword
   * Show or hide the password within the input
   * 
   */

  togglePassword (): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }


  /**
   * generatePassword
   * Creates a new random password and fill the
   * password input automatically
   * 
   */

  generatePassword (): void {
    const password = this._randomString(12);
    this.userForm.get('password').setValue(password);
  }


  /**
   * saveUser
   * Saves the new author to database.
   * 
   */

  saveUser (): void {

    // Validation
    if ( this.userForm.invalid ) return;
  
    // Validation OK
    if ( this.mode === 'create') {

      //
      // Creating
      //

      let user = this.userForm.value;
      user.roles = [this.userForm.value.roles];

      this
        .user
        .create(user)
        .subscribe(
          (user: User) => {
          this.toastr.success('Autor creado correctamente', 'Autor');
          this.dialog.close(user);
          },
          (error: any) => {
            this.toastr.error('Ha habido un error inesperado. Consulta con un administrador.', 'Error!');
          });
    }
    else {

      //
      // Editing
      //

      this
        .user
        .update(this.userForm.value)
        .subscribe(
          (user: User) => {
            this.toastr.success('Autor actualizado correctamente', 'Autor');
            this.dialog.close(user);
          },
          (error: any) => {
            this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
          });

    }

  }


  /**************************************
   *                                    *
   *           PRIVATE METHODS          *
   *                                    *
   * ************************************/

  /**
   * _randomString
   * Generates a new random string according
   * to the length passed by param
   * 
   * @param length {number} - Random string length
   */

  private _randomString (length: number) {

    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];

    return result;
  }

}
