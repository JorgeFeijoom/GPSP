import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects-files-edit',
  templateUrl: './subjects-files-edit.component.html',
  styleUrls: ['./subjects-files-edit.component.scss']
})

export class SubjectsFilesEditComponent implements OnInit {
  areToolsExpanded: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
