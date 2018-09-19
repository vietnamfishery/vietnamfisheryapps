import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthsManagementComponent } from './growths-management.component';

describe('GrowthsManagementComponent', () => {
  let component: GrowthsManagementComponent;
  let fixture: ComponentFixture<GrowthsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
