import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondPrepareManagementRoutingModule } from './pond-prepare-management-routing.module';
import { PondPrepareManagementComponent } from './pond-prepare-management.component';
import { MatIconModule, MatCardModule, MatToolbarModule, MatSliderModule, MatCheckboxModule, MatSidenavModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    NgxDatatableModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    PondPrepareManagementRoutingModule
  ],
  declarations: [PondPrepareManagementComponent]
})
export class PondPrepareManagementModule { }
