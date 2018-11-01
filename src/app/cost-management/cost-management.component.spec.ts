import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostManagementComponent } from './cost-management.component';

describe('CostManagementComponent', () => {
  let component: CostManagementComponent;
  let fixture: ComponentFixture<CostManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
