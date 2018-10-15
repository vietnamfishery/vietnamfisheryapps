import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailGrowthsComponent } from './edit-detail-growths.component';

describe('EditDetailGrowthsComponent', () => {
  let component: EditDetailGrowthsComponent;
  let fixture: ComponentFixture<EditDetailGrowthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDetailGrowthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailGrowthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
