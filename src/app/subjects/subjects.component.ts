import { SubjectService } from './subject.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from './subject';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  subjects: Subject[] = [];

  paginationConfig: any = {
    id: 'subjects_pagination',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  sortValue: any;
  isLoading = true;
  displayedColumns: string[] = ['codigo', 'nombre', 'duracion', 'curso', 'updated'];
  dataSource = new MatTableDataSource<Subject>(this.subjects);

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getAll();
  }

  getAll() {
    this.isLoading = true;

    this
      .subjectService
      .getAll({
        page: this.paginationConfig.currentPage,
        pageSize: this.paginationConfig.itemsPerPage,
        sort: this.sortValue && this.sortValue.direction ? this.sortValue.direction : '',
        sortField: this.sortValue && this.sortValue.active ? this.sortValue.active : '',
      }, 'no-loading-bar')
      .subscribe((subjects: any) => {

        this.paginationConfig.currentPage = subjects.page;
        this.paginationConfig.totalItems = subjects.totalDocs;
        this.paginationConfig.itemsPerPage = subjects.limit;
        this.dataSource.data = subjects.docs;

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

      }, (error) => {
        console.error(error);
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });
  }

  didPageChange (page: number) {
    this.paginationConfig.currentPage = page;
    this.getAll();
  }

  didSortSubjects (event: any) {
    this.sortValue = event;
    this.getAll();
  }

}
