import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsFilesEditComponent } from './subjects-files-edit.component';

describe('SubjectsFilesEditComponent', () => {
  let component: SubjectsFilesEditComponent;
  let fixture: ComponentFixture<SubjectsFilesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsFilesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsFilesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
