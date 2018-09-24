import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockingManagementComponent } from './stocking-management.component';

describe('StockingManagementComponent', () => {
  let component: StockingManagementComponent;
  let fixture: ComponentFixture<StockingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
