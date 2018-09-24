import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPondprepareComponent } from './edit-pondprepare.component';

describe('EditPondprepareComponent', () => {
  let component: EditPondprepareComponent;
  let fixture: ComponentFixture<EditPondprepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPondprepareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPondprepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
