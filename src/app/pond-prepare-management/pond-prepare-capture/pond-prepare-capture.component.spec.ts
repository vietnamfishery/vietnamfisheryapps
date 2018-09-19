import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondPrepareCaptureComponent } from './pond-prepare-capture.component';

describe('PondPrepareCaptureComponent', () => {
  let component: PondPrepareCaptureComponent;
  let fixture: ComponentFixture<PondPrepareCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondPrepareCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondPrepareCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
