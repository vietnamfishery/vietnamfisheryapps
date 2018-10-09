import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPondprepareComponent } from './cost-pondprepare.component';

describe('CostPondprepareComponent', () => {
  let component: CostPondprepareComponent;
  let fixture: ComponentFixture<CostPondprepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostPondprepareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPondprepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
