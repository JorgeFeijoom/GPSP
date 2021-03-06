import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './headers/header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footers/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { MatricularmeComponent } from './matricularme/matricularme.component';
import { EnrollDialogComponent } from './subjects/enroll-dialog/enroll-dialog.component';
import { MySubjectsComponent } from './my-subjects/my-subjects.component';
import { ConfirmDialogComponent } from './subjects/confirm-dialog/confirm-dialog.component';
import { RequestComponent } from './request/request.component';
import { OnlyTeacherUsersGuard } from './app-routing/teacher-user-guard';
import { CreateRequestComponent } from './request/create-request/create-request.component';

registerLocaleData(localeEs, 'es-ES', localeEsExtra);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot(),
    LoadingBarRouterModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    PageNotFoundComponent,
    ProfileComponent,
    SubjectsComponent,
    SubjectDetailComponent,
    MatricularmeComponent,
    EnrollDialogComponent,
    MySubjectsComponent,
    ConfirmDialogComponent,
    RequestComponent,
    CreateRequestComponent
  ],
  providers: [OnlyTeacherUsersGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }, {
    provide: LOCALE_ID, useValue: 'es-ES'
  }],
  entryComponents: [EnrollDialogComponent, ConfirmDialogComponent, CreateRequestComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
