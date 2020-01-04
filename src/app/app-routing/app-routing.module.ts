import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { SubjectsComponent } from '../subjects/subjects.component';
import { SubjectDetailComponent } from '../subject-detail/subject-detail.component';
import { MySubjectsComponent } from '../my-subjects/my-subjects.component';
import { RequestComponent } from '../request/request.component';
import { OnlyTeacherUsersGuard } from './teacher-user-guard';

const routes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', component: SubjectsComponent, pathMatch: 'full' }
  ]
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'profile',
  component: MainLayoutComponent,
  children: [
    { path: '', component: ProfileComponent }
  ]
}, {
  path: 'subjects',
  component: MainLayoutComponent,
  children: [
    { path: '', component: MySubjectsComponent }
  ]
}, {
  canActivate: [OnlyTeacherUsersGuard],
  path: 'request',
  component: MainLayoutComponent,
  children: [
    { path: '', component: RequestComponent }
  ]
}, {
  path: 'detail/:code',
  component: MainLayoutComponent,
  children: [
    { path: '', component: SubjectDetailComponent }
  ]
}, {
  path: 'matricularme',
  component: MainLayoutComponent,
  children: [
    { path: '', component: SubjectsComponent }
  ]
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
