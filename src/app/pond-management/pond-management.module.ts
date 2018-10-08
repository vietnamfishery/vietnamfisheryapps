import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondManagementRoutingModule } from './pond-management-routing.module';
import { PondManagementComponent, DialogAddRole } from './pond-management.component';
import { MatSidenavModule, MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatButtonToggleModule, MatCheckboxModule, MatSliderModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatProgressBarModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgmCoreModule } from '@agm/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPondComponent } from './add-pond/add-pond.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetailPondComponent } from './detail-pond/detail-pond.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { PondManagementService } from './pond-management.service';

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdRw3FWa-aducrcuof3jHJ61BW_9kGe9c'
    }),
    MatFileUploadModule,
    PondManagementRoutingModule
  ],
  entryComponents: [PondManagementComponent, DialogAddRole],
  declarations: [
    PondManagementComponent,
    DialogAddRole,
    AddPondComponent,
    DetailPondComponent,
  ],
  providers:[
    PondManagementService
  ],
  bootstrap: [PondManagementComponent]
})
export class PondManagementModule { }
