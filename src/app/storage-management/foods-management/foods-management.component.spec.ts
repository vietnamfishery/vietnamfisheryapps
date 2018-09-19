import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsManagementComponent } from './foods-management.component';

describe('FoodsManagementComponent', () => {
  let component: FoodsManagementComponent;
  let fixture: ComponentFixture<FoodsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
