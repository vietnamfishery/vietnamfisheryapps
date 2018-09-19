import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthsPresentComponent } from './growths-present.component';

describe('GrowthsPresentComponent', () => {
  let component: GrowthsPresentComponent;
  let fixture: ComponentFixture<GrowthsPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthsPresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthsPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
