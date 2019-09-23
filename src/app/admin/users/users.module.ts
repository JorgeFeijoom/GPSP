import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from './user.service';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
      cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
    }),
    NgxPaginationModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent
  ],
  providers: [UserService],
  entryComponents: [
    UsersCreateComponent,
    UsersEditComponent
  ]
})
export class UsersModule { }
