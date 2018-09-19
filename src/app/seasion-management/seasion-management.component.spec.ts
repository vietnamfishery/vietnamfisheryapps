import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasionManagementComponent } from './seasion-management.component';

describe('SeasionManagementComponent', () => {
  let component: SeasionManagementComponent;
  let fixture: ComponentFixture<SeasionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
