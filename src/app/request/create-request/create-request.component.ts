import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../../subjects/subject.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  //
  // Main user object
  //

  createRequestForm = this.fb.group({
    asignatura: [''],
    codigo: [''],
    nombre: ['']
  });


  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private subject: SubjectService,
              private dialog: MatDialogRef<CreateRequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    console.log("PRUEBA");
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
  createRequest (): void {

    // Validation
    if ( this.createRequestForm.invalid ) { return; }

    //
    // Validation OK
    //

    let request = this.createRequestForm.value;
    console.log(request);
    /* this
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
    */
  }
}
