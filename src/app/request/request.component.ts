import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subject as SubjectRxjs } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CreateRequestComponent } from './create-request/create-request.component';
import { SubjectService } from '../subjects/subject.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requests = {};
  isLoading = true;
  //
  // Dialogs
  //
  createRequestDialog: any = null;

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this
      .subjectService
      .getRequest()
      .subscribe(
        (request) => {
          console.log(request);
          this.requests = request;
          this.isLoading = false;
        },
        (error: any) => {
          this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
  }

  /**
   * openCreateRequestDialog
   * Open the request create dialog
   *
   */

  openCreateRequestDialog () {
    this.createRequestDialog = this.dialog.open(CreateRequestComponent, {
      width: '700px',
      data: {
        dialog: this.createRequestDialog
      }
    });

    this.createRequestDialog.afterClosed().subscribe((request) => {
      if ( request ) {
        console.log("enviado");
      }
    });
  }
}
