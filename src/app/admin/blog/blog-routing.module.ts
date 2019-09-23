import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnlyAdminUsersGuard } from '../admin-user-guard';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';

const routes: Routes = [{
  path: '',
  canActivate: [OnlyAdminUsersGuard],
  children: [
    { path: '', component: BlogListComponent, pathMatch: 'full' },
    { path: 'create', component: BlogCreateComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
