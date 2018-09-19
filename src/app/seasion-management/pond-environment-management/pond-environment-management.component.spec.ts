import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondEnvironmentManagementComponent } from './pond-environment-management.component';

describe('PondEnvironmentManagementComponent', () => {
  let component: PondEnvironmentManagementComponent;
  let fixture: ComponentFixture<PondEnvironmentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondEnvironmentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondEnvironmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
