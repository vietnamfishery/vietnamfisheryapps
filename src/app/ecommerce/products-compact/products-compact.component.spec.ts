import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCompactComponent } from './products-compact.component';

describe('ProductsCompactComponent', () => {
  let component: ProductsCompactComponent;
  let fixture: ComponentFixture<ProductsCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCompactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
