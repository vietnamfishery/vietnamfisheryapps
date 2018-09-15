import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProductsCompactComponent } from './products-compact/products-compact.component';

@NgModule({
  imports: [
    CommonModule,
    EcommerceRoutingModule
  ],
  declarations: [ProductDetailComponent, ProductsComponent, ProductsCompactComponent]
})
export class EcommerceModule { }
