import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    console.log('AUTH');
  }

  ngAfterViewInit() {

    //
    // Changing body background color
    //

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#000';
  }

}
