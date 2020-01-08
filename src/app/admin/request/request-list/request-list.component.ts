import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests = null;
  isLoading = true;

  //
  // Alerts
  //

  acceptRequestAlert = {
    title: '¿Estás seguro?',
    text: 'Se aceptará la petición y se mostrará su estado al equipo docente, <b> no se podrá revertir la operación. </b>',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  };

  installRequestAlert = {
    title: '¿Estás seguro?',
    text: 'Se marcará como instalada la petición y se mostrará su estado al equipo docente, <b> no se podrá revertir la operación. </b>',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  };

  constructor(private requestService: RequestService, private toastr: ToastrService) { }

  ngOnInit() {
    this
    .requestService
    .getAllRequests()
    .subscribe(
      (request) => {
        console.log(request);
        this.requests = request;
        console.log('Request: ' + request);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      });
  }

  acceptRequest (request) {
    this
    .requestService
    .acceptRequest(request._id)
    .subscribe(
      (request) => {
        this.toastr.success('Se ha aceptado la petición.', 'Hecho!');
        this.ngOnInit();
      },
      (error: any) => {
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });
  }

  installRequest (request) {
    this
    .requestService
    .acceptRequest(request._id)
    .subscribe(
      (request) => {
        this.toastr.success('Se ha aceptado la petición.', 'Hecho!');
        this.ngOnInit();
      },
      (error: any) => {
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });
  }
}
