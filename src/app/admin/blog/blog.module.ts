import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogService } from './blog.service';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { MediaPreviewDirective } from '../../directives/media-preview.directive';
import { AuthorService } from './author.service';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { YoutubeService } from '../youtube.service';
import { CategoryService } from './category.service';
import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
      cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
    }),
    FileUploadModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    BlogRoutingModule
  ],
  declarations: [
    BlogListComponent,
    BlogCreateComponent,
    MediaPreviewDirective,
    AuthorCreateComponent,
    CategoryCreateComponent
  ],
  providers: [
    BlogService,
    AuthorService,
    YoutubeService,
    CategoryService
  ],
  entryComponents: [
    AuthorCreateComponent,
    CategoryCreateComponent
  ]
})
export class BlogModule { }
