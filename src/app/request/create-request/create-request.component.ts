import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../../subjects/subject.service';
import { of } from 'rxjs';

export interface Subject {
  codigo: string;
  nombre: string;
}

export interface SubjectGroup {
  disabled?: boolean;
  name: string;
  subject: Subject[];
}

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})

export class CreateRequestComponent {
  //
  // Main user object
  //
  createRequestForm = this.fb.group({
    software: ['', [Validators.required]],
    subject: ['', [Validators.required]]
  });

  subjectGroups: SubjectGroup[] = [
    {
      name: 'Primero',
      subject: [
        { codigo: '40800', nombre: 'Álgebra' },
        { codigo: '40803', nombre: 'Introducción a la Informática' },
        { codigo: '40807', nombre: 'Fundamentos de Programación' },
        { codigo: '40808', nombre: 'Fundamentos de los Computadores' },
        { codigo: '40806', nombre: 'Fundamentos Físicos de la Informática' },
        { codigo: '40805', nombre: 'Matemáticas Computacionales' }
      ]
    },
    {
      name: 'Segundo',
      subject: [
        { codigo: '40813', nombre: 'Programación I' },
        { codigo: '40816', nombre: 'Bases de Datos I' },
        { codigo: '40813', nombre: 'Ingeniería del Software I' },
        { codigo: '40818', nombre: 'Programación II' },
        { codigo: '40814', nombre: 'Fundamentos de los Sistemas Operativos' },
      ]
    },
    {
      name: 'Tercero',
      subject: [
        { codigo: '40819', nombre: 'Administración de Sistemas Operativos' },
        { codigo: '40821', nombre: 'Bases de Datos II' },
        { codigo: '40823', nombre: 'Programación III' },
        { codigo: '40826', nombre: 'Programación IV' },
        { codigo: '40824', nombre: 'Servicios y Seguridad en Red' },
      ]
    },
    {
      name: 'Cuarto',
      subject: [
        { codigo: '40863', nombre: 'Desarrollo de Aplicaciones Web II' },
        { codigo: '40832', nombre: 'Metodologías del Desarrollo Ágil' },
        { codigo: '40829', nombre: 'Arquitectura del Software' },
        { codigo: '40861', nombre: 'Desarrollo de Aplicaciones Web I' },
        { codigo: '40830', nombre: 'Diseño de Interfaces de Usuario' },
      ]
    }
  ];


  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private subject: SubjectService,
              private dialog: MatDialogRef<CreateRequestComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {}


  /**
   * createRequest
   * Add request to database.
   *
   */
  createRequest(): void {

    // Validation
    if ( this.createRequestForm.invalid ) { return; }

    //
    // Validation OK
    //
    const request = this.createRequestForm.value;
    console.log('PRUEBA: ' + JSON.stringify(request));
    this
      .subject
      .createRequest(request)
      .subscribe(
        (request) => {
          this.toastr.success('Petición enviada correctamente', 'Confirmación');
          this.dialog.close(request);
        },
        (error: any) => {
          this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
  }
}
