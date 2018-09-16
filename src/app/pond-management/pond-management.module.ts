import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondManagementRoutingModule } from './pond-management-routing.module';
import { PondManagementComponent, DialogAddPond } from './pond-management.component';
import { MatSidenavModule, MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatButtonToggleModule, MatCheckboxModule, MatSliderModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPondComponent } from './add-pond/add-pond.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';

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

    MatRadioModule,
    MatProgressBarModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FileUploadModule,
    PondManagementRoutingModule
  ],
  entryComponents: [PondManagementComponent, DialogAddPond],
  declarations: [
    PondManagementComponent,
    DialogAddPond,
    AddPondComponent
  ],
  bootstrap: [PondManagementComponent]
})
export class PondManagementModule { }
