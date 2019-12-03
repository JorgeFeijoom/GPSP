import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyAdminUsersGuard } from '../admin-user-guard';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { SubjectsFilesEditComponent } from './subjects-files-edit/subjects-files-edit.component';

const routes: Routes = [{
  path: '',
  canActivate: [OnlyAdminUsersGuard],
  children: [
    { path: '', component: SubjectsListComponent, pathMatch: 'full' },
    { path: 'files', component: SubjectsFilesEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
