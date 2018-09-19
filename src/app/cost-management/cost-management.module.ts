import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostManagementRoutingModule } from './cost-management-routing.module';
import { CostManagementComponent } from './cost-management.component';
import { ImportManagementComponent } from './import-management/import-management.component';
import { BreedsManagementComponent } from './breeds-management/breeds-management.component';
import { HarvestManagementComponent } from './harvest-management/harvest-management.component';
import { TotalComponent } from './total/total.component';

@NgModule({
  imports: [
    CommonModule,
    CostManagementRoutingModule
  ],
  declarations: [CostManagementComponent, ImportManagementComponent, BreedsManagementComponent, HarvestManagementComponent, TotalComponent]
})
export class CostManagementModule { }
