import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from '../subjects/subject';
import { SubjectService } from '../subjects/subject.service';
import { MatriculateService } from './matriculate.service';
import { ToastrService } from 'ngx-toastr';

export interface Details {
  title: string;
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Section {
  icon: string;
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  @Input() subject: any;
  code: any;
  details: Details[];
  isLoading = true;
  @Input() isEnrolled: Boolean;

  docs: Section[] = [
    {
      icon: 'description',
      name: 'Temario',
      updated: new Date('1/1/19'),
    },
    {
      icon: 'face',
      name: 'Profesorado',
      updated: new Date('1/17/19'),
    },
    {
      icon: 'date_range',
      name: 'Horario Académico',
      updated: new Date('1/28/19'),
    },
    {
      icon: 'book',
      name: 'Proyecto Docente',
      updated: new Date('1/28/19'),
    }
  ];
  mv: Section[] = [
    {
      icon: 'dns',
      name: 'archivo.disk',
      updated: new Date('2/20/19'),
    },
    {
      icon: 'offline_bolt',
      name: 'imagen.iso',
      updated: new Date('1/18/19'),
    },
    {
      icon: 'storage',
      name: 'otro.sql',
      updated: new Date('2/20/19'),
    },
    {
      icon: 'folder',
      name: 'hard-disk.mv',
      updated: new Date('1/18/19'),
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private matriculateService: MatriculateService,
    private toastr: ToastrService,
    private location: Location,
    private router: Router
  ) {
}

  ngOnInit(): void {
    this.getSubject();
    this.router.events.subscribe((val) => {
      this.getSubject();
    });
  }

  getSubject(): void {
    this.isLoading = true;
    this.code = +this.route.snapshot.paramMap.get('code');
    console.log(this.code);
    this.enrolled(this.code);
    this.subject = this.subjectService.getSubject(this.code).subscribe(
      (res) => {
        this.subject = res;
        // console.log(this.subject);
        this.details = [
          {title: 'Titulación', text: this.subject.titulacion, cols: 1, rows: 1, color: 'lightblue'},
          {title: 'Especialidad', text: this.subject.especialidad, cols: 1, rows: 1, color: 'lightblue'},
          {title: 'Centro', text: this.subject.centro, cols: 2, rows: 1, color: 'lightblue'},
          {title: 'Curso', text: this.subject.curso, cols: 1, rows: 1, color: '#DDBDF1'},
          {title: 'Departamento', text: this.subject.departamento, cols: 1, rows: 1, color: 'lightblue'},
          {title: 'Tipo', text: this.subject.tipo, cols: 1, rows: 1, color: 'lightblue'},
          {title: 'Carácter', text: this.subject.caracter, cols: 1, rows: 1, color: 'lightblue'},
          {title: 'Créditos', text: this.subject.creditos, cols: 1, rows: 1, color: 'lightblue'},
          {title: 'Duración', text: this.subject.duracion, cols: 1, rows: 1, color: '#DDBDF1'},
        ];
        this.isLoading = false;
      }
    );
  }

  enrolled(code) {
    this
    .subjectService
    .enrolled(code)
    .subscribe((subjectService) => {
      this.isEnrolled = true;
    }, (error) => {
      this.isEnrolled = false;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
