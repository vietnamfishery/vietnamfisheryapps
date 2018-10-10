import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostManagementRoutingModule } from './cost-management-routing.module';
import { CostManagementComponent } from './cost-management.component';
import { HarvestManagementComponent } from './harvest-management/harvest-management.component';
import { MatIconModule, MatToolbarModule, MatTooltipModule, MatCardModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, MatTabsModule, MatListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CostPondprepareComponent } from './cost-pondprepare/cost-pondprepare.component';
import { CostTakecareofComponent } from './cost-takecareof/cost-takecareof.component';

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
    MatListModule,
    MatMenuModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CostManagementRoutingModule
  ],
  declarations: [CostManagementComponent, HarvestManagementComponent, CostPondprepareComponent, CostTakecareofComponent]
})
export class CostManagementModule { }
