import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SubjectService } from '../subjects/subject.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subjects = [];
  ids = [];
  isLoading = true;
  result = '';
  user: any;

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.me().subscribe(data => {
      if ( !data ) { this.user = null;
      } else { this.user = data.user; }
    });
    this.getAll();
  }

  getAll(filterValue?: String) {
    this.isLoading = true;
    this
    .subjectService
    .getMySubjects()
    .subscribe((result) => {
      result.forEach(subject => {
        this.ids.push(subject.codeSubject);
      });
      console.log(this.ids);
      this
      .subjectService
      .getSubjectsFromIds(this.ids)
      .subscribe((subjectsResult: any) => {
        // console.log(subjectsResult);
        let aux: any;
        aux = JSON.parse(subjectsResult);
        aux.forEach(element => {
          this.subjects.push(element);
        });
        // console.log(this.subjects);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }, (error) => {
        console.log(error);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
    }, (error) => {
      console.log(error);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

}
