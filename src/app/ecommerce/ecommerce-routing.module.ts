import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsCompactComponent } from './products-compact/products-compact.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'products',
      component: ProductsComponent
    }, {
      path: 'compact',
      component: ProductsCompactComponent
    }, {
      path: 'detail',
      component: ProductDetailComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
