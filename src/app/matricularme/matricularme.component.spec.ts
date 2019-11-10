import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricularmeComponent } from './matricularme.component';

describe('MatricularmeComponent', () => {
  let component: MatricularmeComponent;
  let fixture: ComponentFixture<MatricularmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricularmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricularmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
