import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedManagementComponent } from './breed-management.component';

describe('BreedManagementComponent', () => {
  let component: BreedManagementComponent;
  let fixture: ComponentFixture<BreedManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
