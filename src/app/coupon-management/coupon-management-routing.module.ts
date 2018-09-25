import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponManagementComponent } from './coupon-management.component';

const routes: Routes = [
  {
    path: '',
    component: CouponManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManagementRoutingModule { }
