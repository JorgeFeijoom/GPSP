import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { SubjectsEditComponent } from './subjects-edit/subjects-edit.component';

import { SubjectService } from './subject.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
      cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
    }),
    NgxPaginationModule,
  ],
  declarations: [SubjectsListComponent, SubjectsEditComponent],
  providers: [SubjectService],
  entryComponents: [
    SubjectsEditComponent
  ]
})
export class SubjectsModule { }
