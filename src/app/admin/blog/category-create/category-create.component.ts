import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  //
  // Main external author object
  //

  categoryForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private category: CategoryService,
              private toastr: ToastrService,
              public dialog: MatDialogRef<CategoryCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  /**
   * saveCategory
   * Creates a new category
   * 
   */

  saveCategory(): void {

    if ( this.categoryForm.invalid ) return;

    //
    // Validation OK
    //

    this
      .category
      .create(this.categoryForm.value)
      .subscribe((category) => {
        this.toastr.success('Categoría creada correctamente', 'Categoría');
        this.dialog.close(category);
      }, (error) => {
        this.toastr.error('Ha habido un error inesperado. Consulta con un administrador.', 'Error!');
      });
  }

}
