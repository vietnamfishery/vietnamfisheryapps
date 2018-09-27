import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostManagementRoutingModule } from './cost-management-routing.module';
import { CostManagementComponent } from './cost-management.component';
import { HarvestManagementComponent } from './harvest-management/harvest-management.component';
import { TotalComponent } from './total/total.component';
import { MatIconModule, MatToolbarModule, MatTooltipModule, MatCardModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatNativeDateModule,
    MatTabsModule,
    CostManagementRoutingModule
  ],
  declarations: [CostManagementComponent, HarvestManagementComponent, TotalComponent]
})
export class CostManagementModule { }
