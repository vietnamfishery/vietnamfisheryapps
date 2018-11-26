import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageManagementRoutingModule } from './storage-management-routing.module';
import { StorageManagementComponent } from './storage-management.component';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { VeterinaryManagementComponent } from './veterinary-management/veterinary-management.component';
import { FoodsManagementComponent } from './foods-management/foods-management.component';
import { MatChipsModule, MatListModule, MatDividerModule, MatAutocompleteModule, MatIconModule, MatToolbarModule, MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatSelectModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatTabsModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BreedManagementComponent } from './breed-management/breed-management.component';
import { ImportManagementComponent } from './import-management/import-management.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { ChangePriceManagementComponent } from './change-price-management/change-price-management.component';
import { StorageManagementService } from './storage-management.service';
import { AddFoodsComponent } from './foods-management/add-foods/add-foods.component';
import { AddMaterialsComponent } from './material-management/add-materials/add-materials.component';
import { AddVeterinaryComponent } from './veterinary-management/add-veterinary/add-veterinary.component';
import { AddBreedComponent } from './breed-management/add-breed/add-breed.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    MatTableModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    StoreModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    StorageManagementRoutingModule
  ],
  declarations: [
    StorageManagementComponent, 
    MaterialManagementComponent, 
    VeterinaryManagementComponent, 
    FoodsManagementComponent, BreedManagementComponent, ImportManagementComponent, CouponManagementComponent, ChangePriceManagementComponent, AddFoodsComponent, AddMaterialsComponent, AddVeterinaryComponent, AddBreedComponent
  ],
  providers: [
    StorageManagementService
  ]
})
export class StorageManagementModule { }
