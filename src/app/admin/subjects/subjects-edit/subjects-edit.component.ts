import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { SubjectService } from '../subject.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-subjects-edit',
  templateUrl: './subjects-edit.component.html',
  styleUrls: ['./subjects-edit.component.scss']
})

export class SubjectsEditComponent implements OnInit {

  //
  // Permits
  //

  cursos: string[] = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];

  //
  // Main user object
  //

  subjectForm = this.fb.group({
    _id: [''],
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    roles: ['']
  });

  //
  // Main password object
  //

  /* passwordForm = this.fb.group({
    password: ['', [Validators.required]],
    send_email: [false]
  }); */

  //
  // Must show password?
  //

  /*isPasswordHidden: boolean = true; */

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private subject: SubjectService,
              private dialog: MatDialogRef<SubjectsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    if ( this.data && this.data.subject ) {
      this.subjectForm.addControl('_id', this.fb.control(''));
      this.subjectForm.reset(this.data.user);
      this.subjectForm.get('roles').setValue(this.data.user.roles[0]);
    } else {
      this.dialog.close();
    }
  }

  /**
   * saveSubject
   * Saves the new author to database.
   *
   */

  saveSubject (): void {

    // Validation
    if ( this.subjectForm.invalid ) { return; }

    //
    // Validation OK
    //

    let subject = this.subjectForm.value;

    this
      .subject
      .update(subject)
      .subscribe(
        (subject: Subject) => {
          this.toastr.success('Asignatura actualizada correctamente', 'Confirmación');
          this.dialog.close(subject);
        },
        (error: any) => {
          this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });

  }
}
