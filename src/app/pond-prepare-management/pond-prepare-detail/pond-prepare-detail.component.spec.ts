import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondPrepareDetailComponent } from './pond-prepare-detail.component';

describe('PondPrepareDetailComponent', () => {
  let component: PondPrepareDetailComponent;
  let fixture: ComponentFixture<PondPrepareDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondPrepareDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondPrepareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
