import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { HeaderAdminComponent } from '../headers/header-admin/header-admin.component';
import { OnlyAuthenticatedUsersGuard } from './authenticated-user-guard';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderAdminComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    OnlyAdminUsersGuard,
    OnlyAuthenticatedUsersGuard
  ]})
export class AdminModule {}
