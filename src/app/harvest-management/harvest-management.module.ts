import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestManagementRoutingModule } from './harvest-management-routing.module';
import { HarvestManagementComponent } from './harvest-management.component';
import { MatCardModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatSidenavModule, MatSliderModule, MatListModule, MatButtonToggleModule, MatTabsModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdddetailHarvestComponent } from './adddetail-harvest/adddetail-harvest.component';
import { EditDetailHarvestComponent } from './edit-detail-harvest/edit-detail-harvest.component';
import { HarvestManagementService } from './harvest-management.service';
import { AnalysisHarvestComponent } from './analysis-harvest/analysis-harvest.component';

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
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HarvestManagementRoutingModule
  ],
  entryComponents: [HarvestManagementComponent],
  declarations: [HarvestManagementComponent, AdddetailHarvestComponent, EditDetailHarvestComponent, AnalysisHarvestComponent],
  bootstrap: [HarvestManagementComponent],
  providers:[
    HarvestManagementService
  ]
})
export class HarvestManagementModule { }
