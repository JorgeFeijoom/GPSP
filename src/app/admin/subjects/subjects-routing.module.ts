import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyAdminUsersGuard } from '../admin-user-guard';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';

const routes: Routes = [{
  path: '',
  canActivate: [OnlyAdminUsersGuard],
  children: [
    { path: '', component: SubjectsListComponent, pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
