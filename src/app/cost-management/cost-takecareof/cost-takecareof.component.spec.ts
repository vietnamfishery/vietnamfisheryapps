import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTakecareofComponent } from './cost-takecareof.component';

describe('CostTakecareofComponent', () => {
  let component: CostTakecareofComponent;
  let fixture: ComponentFixture<CostTakecareofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostTakecareofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostTakecareofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
