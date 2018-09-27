import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageManagementRoutingModule } from './storage-management-routing.module';
import { StorageManagementComponent } from './storage-management.component';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { VeterinaryManagementComponent } from './veterinary-management/veterinary-management.component';
import { FoodsManagementComponent } from './foods-management/foods-management.component';
import { MatIconModule, MatToolbarModule, MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatSelectModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatTabsModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BreedManagementComponent } from './breed-management/breed-management.component';
import { ImportManagementComponent } from './import-management/import-management.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { ChangePriceManagementComponent } from './change-price-management/change-price-management.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    StoreModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    StorageManagementRoutingModule
  ],
  declarations: [
    StorageManagementComponent, 
    MaterialManagementComponent, 
    VeterinaryManagementComponent, 
    FoodsManagementComponent, BreedManagementComponent, ImportManagementComponent, CouponManagementComponent, ChangePriceManagementComponent
  ]
})
export class StorageManagementModule { }
