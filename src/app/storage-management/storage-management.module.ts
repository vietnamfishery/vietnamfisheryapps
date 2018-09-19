import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageManagementRoutingModule } from './storage-management-routing.module';
import { StorageManagementComponent } from './storage-management.component';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { VeterinaryManagementComponent } from './veterinary-management/veterinary-management.component';
import { FoodsManagementComponent } from './foods-management/foods-management.component';

@NgModule({
  imports: [
    CommonModule,
    StorageManagementRoutingModule
  ],
  declarations: [
    StorageManagementComponent, 
    MaterialManagementComponent, 
    VeterinaryManagementComponent, 
    FoodsManagementComponent
  ]
})
export class StorageManagementModule { }
