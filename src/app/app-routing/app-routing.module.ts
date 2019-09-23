import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', component: HomeComponent, pathMatch: 'full' }
  ]
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
