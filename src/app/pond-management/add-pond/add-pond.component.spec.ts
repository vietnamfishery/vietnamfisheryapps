import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPondComponent } from './add-pond.component';

describe('AddPondComponent', () => {
  let component: AddPondComponent;
  let fixture: ComponentFixture<AddPondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
