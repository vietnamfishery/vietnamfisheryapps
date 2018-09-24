import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockingComponent } from './add-stocking.component';

describe('AddStockingComponent', () => {
  let component: AddStockingComponent;
  let fixture: ComponentFixture<AddStockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
