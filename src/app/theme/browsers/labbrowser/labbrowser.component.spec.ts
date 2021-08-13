import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabbrowserComponent } from './labbrowser.component';

describe('LabbrowserComponent', () => {
  let component: LabbrowserComponent;
  let fixture: ComponentFixture<LabbrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabbrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
