import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.scss']
})

export class EnrollDialogComponent implements OnInit {

  enrollForm = this.fb.group({
    accessCode: ['', [Validators.required]]
  });

  subjectCode = this.data.subjectCode;
  accessSubjectCode = this.data.subjectAccessCode;

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enrollUser() {
    // Validation
    console.log('Formulario: ' + this.enrollForm.value.accessCode + ' / Subject: ' + this.accessSubjectCode)
    if ( this.enrollForm.invalid ) return;
    
    if ( this.enrollForm.value.accessCode !== this.accessSubjectCode) return;

    alert('Coincide');
  }
}
