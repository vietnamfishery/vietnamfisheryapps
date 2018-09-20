import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddetailHarvestComponent } from './adddetail-harvest.component';

describe('AdddetailHarvestComponent', () => {
  let component: AdddetailHarvestComponent;
  let fixture: ComponentFixture<AdddetailHarvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddetailHarvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddetailHarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
