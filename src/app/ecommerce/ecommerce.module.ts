import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProductsCompactComponent } from './products-compact/products-compact.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatSidenavModule, MatCheckboxModule, MatSliderModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    FlexLayoutModule,
    EcommerceRoutingModule
  ],
  declarations: [ProductDetailComponent, ProductsComponent, ProductsCompactComponent]
})
export class EcommerceModule { }
