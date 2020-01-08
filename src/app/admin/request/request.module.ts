import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestRoutingModule } from './request-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
      cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
    })
  ],
  declarations: [RequestListComponent]
})
export class RequestModule { }
