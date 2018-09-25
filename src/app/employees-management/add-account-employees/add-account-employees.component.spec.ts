import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountEmployeesComponent } from './add-account-employees.component';

describe('AddAccountEmployeesComponent', () => {
  let component: AddAccountEmployeesComponent;
  let fixture: ComponentFixture<AddAccountEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
