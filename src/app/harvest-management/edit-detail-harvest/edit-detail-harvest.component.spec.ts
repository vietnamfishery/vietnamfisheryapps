import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailHarvestComponent } from './edit-detail-harvest.component';

describe('EditDetailHarvestComponent', () => {
  let component: EditDetailHarvestComponent;
  let fixture: ComponentFixture<EditDetailHarvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDetailHarvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailHarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
