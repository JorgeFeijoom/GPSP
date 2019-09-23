import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../auth/auth.service';
import { BlogService } from '../blog.service';
import { User } from '../../users/user';
import { Post } from '../post';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Output() searchValue: String;

  myUser: User;
  posts: Post[] = [];

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
  displayedColumns: string[] = ['title', 'author', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Post>(this.posts);


  //
  // Alerts
  //

  userDeletionAlert = {
    title: '¿Estás seguro?',
    text: 'La publicación será borrado y no estará disponible',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  };


  constructor(private blog: BlogService,
              private auth: AuthService,
              private toastr: ToastrService) { }


  ngOnInit() {

    this.dataSource.sort = this.sort;

    //
    // Loading users first time
    //

    this.loadPosts();

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
        this.loadPosts();
      });
  }


  /**
   * loadPosts
   * Calls to backend in order to retrieve all the posts
   * according to the query.
   * 
   */

  loadPosts (filterValue?: String) {

    this.isLoading = true;

    this
      .blog
      .getAll({
        page: this.paginationConfig.currentPage,
        pageSize: this.paginationConfig.itemsPerPage,
        sort: this.sortValue && this.sortValue.direction ? this.sortValue.direction : '',
        sortField: this.sortValue && this.sortValue.active ? this.sortValue.active : '',
        filter: this.searchValue ? this.searchValue : ''
      }, 'no-loading-bar')
      .subscribe((posts: any) => {

        this.paginationConfig.currentPage = posts.page;
        this.paginationConfig.totalItems = posts.totalDocs;
        this.paginationConfig.itemsPerPage = posts.limit;
        this.dataSource.data = posts.docs;

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

      }, (error: any) => {
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
    this.loadPosts();
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

  didFilterPosts (event: any) {
    this.searchBarInput.next(event);
  }


  /**
   * didSortPosts
   * Triggered when user is trying to sort
   * a column in the posts table.
   * 
   */

  didSortPosts (event: any) {
    this.sortValue = event;
    this.loadPosts()
  }


  /**
   * deletePost
   * Set up as deleted the given post
   * 
   * @param post - Post that is going to be deleted 
   */

  deletePost (post: Post) {
    
    if ( !post ) return;

    this
      .blog
      .remove(post._id)
      .subscribe(() => {
        this.loadPosts();
        this.toastr.success('La publicación ha sido borrada correctamente', 'Publicación');
      }, (error: any) => {
        console.error(error);
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });

  }

}
