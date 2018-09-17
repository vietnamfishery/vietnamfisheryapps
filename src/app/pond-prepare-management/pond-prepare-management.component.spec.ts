import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondPrepareManagementComponent } from './pond-prepare-management.component';

describe('PondPrepareManagementComponent', () => {
  let component: PondPrepareManagementComponent;
  let fixture: ComponentFixture<PondPrepareManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondPrepareManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondPrepareManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
