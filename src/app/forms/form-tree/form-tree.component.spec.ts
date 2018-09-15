import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTreeComponent } from './form-tree.component';

describe('FormTreeComponent', () => {
  let component: FormTreeComponent;
  let fixture: ComponentFixture<FormTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
