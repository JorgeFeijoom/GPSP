import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyAdminUsersGuard } from '../admin-user-guard';
import { ImportCsvComponent } from './import-csv/import-csv.component';

const routes: Routes = [{
  path: '',
  canActivate: [OnlyAdminUsersGuard],
  children: [
    { path: '', component: ImportCsvComponent, pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ImportRoutingModule { }
