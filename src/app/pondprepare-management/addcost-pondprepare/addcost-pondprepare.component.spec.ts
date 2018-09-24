import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcostPondprepareComponent } from './addcost-pondprepare.component';

describe('AddcostPondprepareComponent', () => {
  let component: AddcostPondprepareComponent;
  let fixture: ComponentFixture<AddcostPondprepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcostPondprepareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcostPondprepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
