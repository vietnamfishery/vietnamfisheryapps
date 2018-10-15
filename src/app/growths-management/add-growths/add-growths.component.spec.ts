import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrowthsComponent } from './add-growths.component';

describe('AddGrowthsComponent', () => {
  let component: AddGrowthsComponent;
  let fixture: ComponentFixture<AddGrowthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGrowthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrowthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
