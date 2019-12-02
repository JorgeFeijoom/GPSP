import { SubjectService } from '../subjects/subject.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../subjects/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.scss']
})

export class MySubjectsComponent implements OnInit {
  subjects = [];
  ids = [];
  isLoading = true;
  result: string = '';

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(filterValue?: String) {
    this.isLoading = true;
    this
    .subjectService
    .getMySubjects()
    .subscribe((result) => {
      result.forEach(subject => {
        this.ids.push(subject.codeSubject);
      });
      console.log(this.ids);
      this
      .subjectService
      .getSubjectsFromIds(this.ids)
      .subscribe((subjectsResult: any) => {
        // console.log(subjectsResult);
        let aux: any;
        aux = JSON.parse(subjectsResult);
        aux.forEach(element => {
          this.subjects.push(element);
        });
        // console.log(this.subjects);
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.isLoading = false;
      });
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
  goToDetails(code) {
    this
    .subjectService
    .enrolled(code)
    .subscribe((result) => {
      this.router.navigateByUrl('/detail/' + code);
    }, (error) => {
      this.toastr.warning('No estás matriculado en la asignatura. Utiliza el código de acceso.', 'Ups!');
    });
  }

  confirmDialog(code): void {
    const message = `¿Estás segura/o que quieres desmatricularte?`;

    const dialogData = new ConfirmDialogModel('Desmatriculación', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '800px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this
        .subjectService
        .remove(code)
        .subscribe((result) => {
          window.location.reload();
        }, (error) => {
          console.error(error);
          this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
      }
    });
  }
}
