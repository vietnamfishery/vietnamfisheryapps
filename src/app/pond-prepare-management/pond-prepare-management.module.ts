import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondPrepareManagementRoutingModule } from './pond-prepare-management-routing.module';
import { PondPrepareManagementComponent } from './pond-prepare-management.component';
import { MatIconModule, MatCardModule, MatToolbarModule, MatSliderModule, MatCheckboxModule, MatSidenavModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PondPrepareCaptureComponent } from './pond-prepare-capture/pond-prepare-capture.component';
import { PondPrepareListComponent } from './pond-prepare-list/pond-prepare-list.component';
import { PondPrepareDetailComponent } from './pond-prepare-detail/pond-prepare-detail.component';

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
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    PondPrepareManagementRoutingModule
  ],
  declarations: [PondPrepareManagementComponent, PondPrepareCaptureComponent, PondPrepareListComponent, PondPrepareDetailComponent]
})
export class PondPrepareManagementModule { }
