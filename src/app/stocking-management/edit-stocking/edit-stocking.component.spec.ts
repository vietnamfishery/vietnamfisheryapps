import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockingComponent } from './edit-stocking.component';

describe('EditStockingComponent', () => {
  let component: EditStockingComponent;
  let fixture: ComponentFixture<EditStockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStockingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
