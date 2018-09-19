import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryManagementComponent } from './veterinary-management.component';

describe('VeterinaryManagementComponent', () => {
  let component: VeterinaryManagementComponent;
  let fixture: ComponentFixture<VeterinaryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
