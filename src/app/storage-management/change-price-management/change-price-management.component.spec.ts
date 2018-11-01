import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePriceManagementComponent } from './change-price-management.component';

describe('ChangePriceManagementComponent', () => {
  let component: ChangePriceManagementComponent;
  let fixture: ComponentFixture<ChangePriceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePriceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePriceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
