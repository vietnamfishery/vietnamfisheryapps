import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasionManagementRoutingModule } from './seasion-management-routing.module';
import { SeasionManagementComponent, DialogAddSeasion } from './seasion-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PondPrepareManagementComponent } from './pond-prepare-management/pond-prepare-management.component';
import { TakeCareManagementComponent } from './take-care-management/take-care-management.component';
import { GrowthsManagementComponent } from './growths-management/growths-management.component';
import { WasteManagementComponent } from './waste-management/waste-management.component';
import { PondEnvironmentManagementComponent } from './pond-environment-management/pond-environment-management.component';

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
    MatDialogModule,
    MatInputModule,
    SeasionManagementRoutingModule
  ],
  entryComponents: [SeasionManagementComponent, DialogAddSeasion],
  declarations: [
    SeasionManagementComponent,
    DialogAddSeasion,
    PondPrepareManagementComponent,
    TakeCareManagementComponent,
    GrowthsManagementComponent,
    WasteManagementComponent,
    PondEnvironmentManagementComponent
  ],
  bootstrap: [SeasionManagementComponent]
})
export class SeasionManagementModule { }
