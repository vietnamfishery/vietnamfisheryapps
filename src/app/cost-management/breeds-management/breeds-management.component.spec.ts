import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsManagementComponent } from './breeds-management.component';

describe('BreedsManagementComponent', () => {
  let component: BreedsManagementComponent;
  let fixture: ComponentFixture<BreedsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
