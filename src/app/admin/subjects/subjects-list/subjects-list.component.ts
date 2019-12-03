import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subject as SubjectRxjs } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { SubjectsEditComponent } from '../subjects-edit/subjects-edit.component';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Output() searchValue: String;

  mySubject: Subject;
  subjects: Subject[] = [];

  paginationConfig: any = {
    id: 'users_pagination',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  searchBar = false;
  searchBarInput: SubjectRxjs<string> = new SubjectRxjs();
  sortValue: any;
  isLoading = true;
  displayedColumns: string[] = ['codigo', 'nombre', 'duracion', 'curso', 'updated', 'actions'];
  dataSource = new MatTableDataSource<Subject>(this.subjects);


  //
  // Dialogs
  //

  editSubjectDialog: any = null;

  constructor(
    private subjectService: SubjectService,
    private auth: AuthService,
    private toastr: ToastrService,
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
      .getAll({
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
      });
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

  /**
   * openEditSubjecyDialog
   * Open the subject edition dialog
   *
   */

  openEditSubjectDialog (subject: Subject) {

    if ( !subject ) { return; }

    this.editSubjectDialog = this.dialog.open(SubjectsEditComponent, {
      width: '700px',
      data: {
        subject: subject,
        dialog: this.editSubjectDialog
      }
    });

    this.editSubjectDialog.afterClosed().subscribe((subject: Subject) => {
      if ( subject ) {
        this.getAll();
      }
    });
  }


}
