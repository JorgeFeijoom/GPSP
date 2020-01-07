import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests = null;
  isLoading = true;

  constructor(private requestService: RequestService) { }

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

}
