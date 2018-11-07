import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondManagementRoutingModule } from './pond-management-routing.module';
import { PondManagementComponent } from './pond-management.component';
import { MatSidenavModule, MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatButtonToggleModule, MatCheckboxModule, MatSliderModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatProgressBarModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgmCoreModule } from '@agm/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPondComponent } from './add-pond/add-pond.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetailPondComponent } from './detail-pond/detail-pond.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { PondManagementService } from './pond-management.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogAddRole } from './dialog-add-role.component';
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
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBV-uHTqX6aH5_16ZmLa9uv16Op_R4t-1Y'
    }),
    MatFileUploadModule,
    MatDatepickerModule,
    PondManagementRoutingModule
  ],
  entryComponents: [PondManagementComponent, DialogAddRole],
  declarations: [
    PondManagementComponent,
    DialogAddRole,
    AddPondComponent,
    DetailPondComponent,
  ],
  providers: [
    PondManagementService
  ],
  bootstrap: [PondManagementComponent]
})
export class PondManagementModule { }
