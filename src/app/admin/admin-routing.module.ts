import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';

const routes: Routes = [{
  path: '',
  canActivate: [OnlyAdminUsersGuard],
  component: AdminLayoutComponent,
  children: [
    { path: '', component: AdminComponent, pathMatch: 'full' },
    { path: 'users', loadChildren: 'app/admin/users/users.module#UsersModule' },
    { path: 'subjects', loadChildren: 'app/admin/subjects/subjects.module#SubjectsModule' },
    { path: 'request', loadChildren: 'app/admin/request/request.module#RequestModule' },
    { path: 'import', loadChildren: 'app/admin/import/import.module#ImportModule' }
  ]
}, {
  path: '**', redirectTo: 'admin'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
