import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabentryComponent } from './labentry.component';

describe('LabentryComponent', () => {
  let component: LabentryComponent;
  let fixture: ComponentFixture<LabentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
