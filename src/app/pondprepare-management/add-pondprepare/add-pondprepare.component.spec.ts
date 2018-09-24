import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPondprepareComponent } from './add-pondprepare.component';

describe('AddPondprepareComponent', () => {
  let component: AddPondprepareComponent;
  let fixture: ComponentFixture<AddPondprepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPondprepareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPondprepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
