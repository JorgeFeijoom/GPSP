import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestRoutingModule } from './request-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule
  ],
  declarations: [RequestListComponent]
})
export class RequestModule { }
