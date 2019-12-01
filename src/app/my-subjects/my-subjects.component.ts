import { SubjectService } from '../subjects/subject.service';
import { Component, OnInit, Output, ViewChild, Inject, Input } from '@angular/core';
import { Subject } from '../subjects/subject';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnrollDialogComponent } from '../subjects/enroll-dialog/enroll-dialog.component';
import { Subject as SubjectIn } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.scss']
})

export class MySubjectsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Output() searchValue: String;
  mySubject: Subject;
  subjects: Subject[] = [];

  paginationConfig: any = {
    id: 'subjects_pagination',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  searchBar: boolean = false;
  searchBarInput: SubjectIn<string> = new SubjectIn();
  sortValue: any;
  isLoading = true;
  displayedColumns: string[] = ['codigo', 'nombre', 'duracion', 'curso', 'updated', 'actions'];
  dataSource = new MatTableDataSource<Subject>(this.subjects);
  accessCode: string;

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getAll();

        this
      .searchBarInput
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(filterValue => {
        this.getAll();
      });
  }

  getAll(filterValue?: String) {
    this.isLoading = true;
    this
    .subjectService
    .getMySubjects()
    .subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
    /*this
      .subjectService
      .getMySubjects({
        page: this.paginationConfig.currentPage,
        pageSize: this.paginationConfig.itemsPerPage,
        sort: this.sortValue && this.sortValue.direction ? this.sortValue.direction : '',
        sortField: this.sortValue && this.sortValue.active ? this.sortValue.active : '',
        filter: this.searchValue ? this.searchValue : ''
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
      });*/
  }

  didPageChange (page: number) {
    this.paginationConfig.currentPage = page;
    this.getAll();
  }

  /**
   * toggleSearchBar
   * Show or hide the search bar
   *
   */
  toggleSearchBar () {
    this.searchBar = !this.searchBar;
  }

  /**
   * didFilterSubjects
   * Triggered when user is trying to filter
   * results by writing in the searching bar.
   *
   */

  didFilterSubjects (event: any) {
    this.searchBarInput.next(event);
  }

  didSortSubjects (event: any) {
    this.sortValue = event;
    this.getAll();
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

  openDialog(subjectCode, enrollCode): void {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      width: '400px',
      data: {accesCode: this.accessCode, subjectCode: subjectCode, enrollCode: enrollCode}
    });

    /* dialogRef.afterClosed().subscribe(result => {
      this.goToDetails(subjectCode);
    }); */
  }

  checkEnrolled(code) {
    this
    .subjectService
    .enrolled(code)
    .subscribe((result) => {
      return true;
    }, (error) => {
      return false;
    });
  }

}
