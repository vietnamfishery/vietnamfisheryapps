import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcostPondprepareComponent } from './editcost-pondprepare.component';

describe('EditcostPondprepareComponent', () => {
  let component: EditcostPondprepareComponent;
  let fixture: ComponentFixture<EditcostPondprepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcostPondprepareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcostPondprepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
