import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.scss']
})

export class EnrollDialogComponent implements OnInit {
  enrollForm = this.fb.group({
    accessCode: ['', [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private subjectService: SubjectService,
  ) {}

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enrollUser() {
    // Validation
    const inputCode: string = this.enrollForm.value.accessCode;
    const subjectCode: string = this.data.subjectCode;
    const enrollCode: string = this.data.enrollCode;
    if ( this.enrollForm.invalid ) {
      return;
    }
    if (inputCode.toString() !== enrollCode.toString()) {
      this.toastr.error('El código de matriculación no es correcto. Inténtalo de nuevo o contacta con un administrador.', 'Error!');
      return;
    }

    this
    .subjectService
    .enrolled(subjectCode)
    .subscribe((res) => {
      this.toastr.warning('Ya estás matriculado en esta asignatura.', 'Error!');
    }, (error) => {

      // Matriculación
      this
      .subjectService
      .enroll(subjectCode)
      .subscribe((res) => {
        console.log(res);
        this.toastr.success('Has sido matriculado en ' + subjectCode + '. Tienes acceso a los contenidos de la asignatura.', '¡Bienvenido!');
        this.dialogRef.close();
      }, (er) => {
        this.toastr.warning('Ha habido un error inesperado. Consulta con un administrador.', 'Ups!');
        this.dialogRef.close();
      });
    });
  }
}
