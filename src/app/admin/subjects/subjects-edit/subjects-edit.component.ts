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

  disable = true;

  //
  // Permits
  //

  cursos: string[] = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];

  //
  // Main user object
  //

  subjectForm = this.fb.group({
    _id: [''],
    codigo: [''],
    nombre: [''],
    descripcion: [''],
    curso: [''],
    semestre: [''],
    creditos: [''],
    titulacion: [''],
    centro: [''],
    departamento: [''],
    tipo: [''],
    caracter: [''],
    especialidad: [''],
    enrollCode: ['']
  });


  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private subject: SubjectService,
              private dialog: MatDialogRef<SubjectsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    console.log(this.data.subject);
    this.disableForm();
    /* if ( this.data && this.data.subject ) {
      this.subjectForm.addControl('_id', this.fb.control(''));
      this.subjectForm.reset(this.data.subject);
      this.subjectForm.get('roles').setValue(this.data.user.roles[0]);
    } else {
      this.dialog.close();
    }*/

  }

  /**
   * saveSubject
   * Saves the new author to database.
   *
   */
  disableForm() {
    this.toastr.warning('Se ha activado el modo lectura.', 'Modo lectura');
    this.disable = true;
    this.subjectForm.disable();
  }

  enableForm() {
    this.toastr.success('Se ha activado el modo edición, puede editar la información.', 'Modo edición');
    this.disable = false;
    this.subjectForm.enable();
  }

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
