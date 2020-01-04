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
