import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondprepareManagementComponent } from './pondprepare-management.component';

describe('PondprepareManagementComponent', () => {
  let component: PondprepareManagementComponent;
  let fixture: ComponentFixture<PondprepareManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondprepareManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondprepareManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
