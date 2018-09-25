import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponManagementRoutingModule } from './coupon-management-routing.module';
import { CouponManagementComponent } from './coupon-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxDatatableModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatNativeDateModule,
    CouponManagementRoutingModule
  ],
  declarations: [CouponManagementComponent]
})
export class CouponManagementModule { }
