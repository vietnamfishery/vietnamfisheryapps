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
import { FileUploadModule } from 'ng2-file-upload';
import { DetailPondComponent } from './detail-pond/detail-pond.component';

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
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5txeKO9Fi2JGxEy60I3jqE0Y7DU57KY0'
    }),
    PondManagementRoutingModule
  ],
  entryComponents: [PondManagementComponent, DialogAddRole],
  declarations: [
    PondManagementComponent,
    DialogAddRole,
    AddPondComponent,
    DetailPondComponent,
  ],
  bootstrap: [PondManagementComponent]
})
export class PondManagementModule { }
