import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestManagementRoutingModule } from './harvest-management-routing.module';
import { HarvestManagementComponent, DialogAddHarvest } from './harvest-management.component';
import { MatCardModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatSidenavModule, MatSliderModule, MatListModule, MatButtonToggleModule, MatTabsModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdddetailHarvestComponent } from './adddetail-harvest/adddetail-harvest.component';
import { EditDetailHarvestComponent } from './edit-detail-harvest/edit-detail-harvest.component';

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
    MatSidenavModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HarvestManagementRoutingModule
  ],
  entryComponents: [HarvestManagementComponent, DialogAddHarvest],
  declarations: [HarvestManagementComponent, DialogAddHarvest, AdddetailHarvestComponent, EditDetailHarvestComponent],
  bootstrap: [HarvestManagementComponent]
})
export class HarvestManagementModule { }
