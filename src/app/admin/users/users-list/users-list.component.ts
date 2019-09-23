import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../auth/auth.service';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Output() searchValue: String;

  myUser: User;
  users: User[] = [];

  paginationConfig: any = {
    id: 'users_pagination',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  searchBar: boolean = false;
  searchBarInput : Subject<string> = new Subject();
  sortValue: any;
  isLoading: boolean = true;
  displayedColumns: string[] = ['fullname', 'email', 'permits', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);


  //
  // Alerts
  //

  userDeletionAlert = {
    title: '¿Estás seguro?',
    text: 'El usuario será borrado y no estará disponible',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  };


  //
  // Dialogs
  //

  createUserDialog: any = null;
  editUserDialog: any = null;


  constructor(private user: UserService,
              private auth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }


  ngOnInit() {

    this.dataSource.sort = this.sort;

    //
    // Loading users first time
    //

    this.loadUsers();

    //
    // Getting user info
    //

    this.auth.me().subscribe((data) => {
      this.myUser = data.user;
    });

    //
    // Debounce for searching bar
    //

    this
      .searchBarInput
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(filterValue => {
        this.loadUsers();
      });
  }


  /**
   * loadUsers
   * Calls to backend in order to retrieve all the users
   * according to the query.
   * 
   */

  loadUsers (filterValue?: String) {

    this.isLoading = true;

    this
      .user
      .getAll({
        page: this.paginationConfig.currentPage,
        pageSize: this.paginationConfig.itemsPerPage,
        sort: this.sortValue && this.sortValue.direction ? this.sortValue.direction : '',
        sortField: this.sortValue && this.sortValue.active ? this.sortValue.active : '',
        filter: this.searchValue ? this.searchValue : ''
      }, 'no-loading-bar')
      .subscribe((users: any) => {

        this.paginationConfig.currentPage = users.page;
        this.paginationConfig.totalItems = users.totalDocs;
        this.paginationConfig.itemsPerPage = users.limit;
        this.dataSource.data = users.docs;

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

      }, (error) => {
        console.error(error);
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });

  }


  /**
   * didPageChange
   * Triggered when user changes the current
   * page via pagination.
   * 
   */

  didPageChange (page: number) {
    this.paginationConfig.currentPage = page;
    this.loadUsers();
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
   * didFilterUsers
   * Triggered when user is trying to filter
   * results by writing in the searching bar.
   * 
   */

  didFilterUsers (event: any) {
    this.searchBarInput.next(event);
  }


  /**
   * didSortUsers
   * Triggered when user is trying to sort
   * a column in the users table.
   * 
   */

  didSortUsers (event: any) {
    this.sortValue = event;
    this.loadUsers()
  }


  /**
   * deleteUser
   * Set up as deleted the given user
   * 
   * @param user - User that is going to be deleted 
   */

  deleteUser (user: User) {
    
    if ( !user ) return;

    this
      .user
      .remove(user._id)
      .subscribe(() => {
        this.loadUsers();
        this.toastr.success('El usuario ha sido borrado correctamente', 'Usuario');
      }, (error) => {
        console.error(error);
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });

  }


  /**
   * openCreateUserDialog
   * Open the user creation dialog
   * 
   */

  openCreateUserDialog () {

    this.createUserDialog = this.dialog.open(UsersCreateComponent, {
      width: '700px',
      data: { dialog: this.createUserDialog }
    });

    this.createUserDialog.afterClosed().subscribe((user: User) => {
      if ( user )
        this.loadUsers();
    });
  }


  /**
   * openEditUserDialog
   * Open the user edition dialog
   * 
   */

  openEditUserDialog (user: User) {

    if ( !user ) return;

    this.editUserDialog = this.dialog.open(UsersEditComponent, {
      width: '700px',
      data: {
        user: user,
        dialog: this.editUserDialog
      }
    });

    this.editUserDialog.afterClosed().subscribe((user: User) => {
      if ( user )
        this.loadUsers();
    });
  }

}
