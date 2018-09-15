import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePinningComponent } from './table-pinning.component';

describe('TablePinningComponent', () => {
  let component: TablePinningComponent;
  let fixture: ComponentFixture<TablePinningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePinningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePinningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
