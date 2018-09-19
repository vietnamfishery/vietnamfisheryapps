import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PondEnvironmentComponent } from './pond-environment.component';

describe('PondEnvironmentComponent', () => {
  let component: PondEnvironmentComponent;
  let fixture: ComponentFixture<PondEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PondEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PondEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
