import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondManagementComponent } from './pond-management.component';

describe('PondManagementComponent', () => {
  let component: PondManagementComponent;
  let fixture: ComponentFixture<PondManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
