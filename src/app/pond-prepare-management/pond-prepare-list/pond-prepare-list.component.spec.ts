import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondPrepareListComponent } from './pond-prepare-list.component';

describe('PondPrepareListComponent', () => {
  let component: PondPrepareListComponent;
  let fixture: ComponentFixture<PondPrepareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondPrepareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondPrepareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
