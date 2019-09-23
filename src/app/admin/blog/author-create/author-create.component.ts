import { Component, OnInit, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TokenStorage } from '../../../auth/token.storage';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss']
})
export class AuthorCreateComponent implements OnInit {

  //
  // Mode: create || edit
  //

  mode: string = null;

  //
  // Main external author object
  //

  authorForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    bio: ['', [Validators.required]],
    thumbnail: ['', [Validators.required]],
    facebook: [''],
    twitter: [''],
    instagram: [''],
    linkedin: ['']
  });

  public imageHasBaseDropZoneOver: boolean = false;

  //
  // Images uploaders
  //

  public imageUploader: FileUploader = new FileUploader({ url: '/api/media/post/author', authToken: 'Bearer ' + this.token.getToken(), itemAlias: 'author' });

  constructor(private token: TokenStorage,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private author: AuthorService,
              public dialog: MatDialogRef<AuthorCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    if ( this.data && this.data.external_author ) {
      this.authorForm.addControl('_id', this.fb.control(''));
      this.authorForm.reset(this.data.external_author);
      this.mode = 'edit';
    }
    else
      this.mode = 'create';

    //
    // Listening for the gallery images to finish to upload
    //

    this.imageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let image = JSON.parse(response);
      this.authorForm.get('thumbnail').setValue(image.m.url);
      this.toastr.success('Imagen de autor subida correctamente', 'Autor');
    };

  }

  /**
   * imageOverBase
   * It triggers when user tries to drag and drop an
   * image over the container. - External author version
   * 
   * @param event {any}
   */

  imageOverBase (event: any) {
    this.imageHasBaseDropZoneOver = event;
  }


  /**
   * imageDroppedOverBase
   * When the user drops the file over the drag
   * and drop zone. This event is triggered.
   * 
   * @param event {any}
   */

  imageDroppedOverBase (event: any) {
    if ( this.imageUploader.queue.length > 1 )
      this.imageUploader.queue.splice(0, 1);

    //
    // Cleaning URL
    //

    this.authorForm.get('thumbnail').setValue('');
  }


  /**
   * saveAuthor
   * Saves the new author to database.
   * 
   */

  saveAuthor (): void {

    // Validation
    if ( this.authorForm.invalid ) return;
  
    // Validation OK
    if ( this.mode === 'create') {

      //
      // Creating
      //

      this
        .author
        .create(this.authorForm.value)
        .subscribe((author) => {
          this.toastr.success('Autor creado correctamente', 'Autor');
          this.dialog.close(author);
        }, (error) => {
          console.log(error);
          this.toastr.error('Ha habido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    }
    else {

      //
      // Editing
      //

      this
        .author
        .update(this.authorForm.value)
        .subscribe(
          (author) => {
            this.toastr.success('Autor actualizado correctamente', 'Autor');
            this.dialog.close(author);
          },
          (error) => {
            console.log(error);
            this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
          });

    }


  }

}
