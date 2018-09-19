import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeCareManagementComponent } from './take-care-management.component';

describe('TakeCareManagementComponent', () => {
  let component: TakeCareManagementComponent;
  let fixture: ComponentFixture<TakeCareManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeCareManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeCareManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
