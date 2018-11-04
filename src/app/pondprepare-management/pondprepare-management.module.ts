import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondprepareManagementRoutingModule } from './pondprepare-management-routing.module';
import { PondprepareManagementComponent } from './pondprepare-management.component';
import { MatSnackBarModule, MatChipsModule, MatTabsModule, MatCardModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSidenavModule, MatSliderModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, MatAutocompleteModule, MatRadioModule, MatStepperModule, MatTableModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPondprepareComponent } from './add-pondprepare/add-pondprepare.component';
import { EditPondprepareComponent } from './edit-pondprepare/edit-pondprepare.component';
import { AddcostPondprepareComponent } from './addcost-pondprepare/addcost-pondprepare.component';
import { EditcostPondprepareComponent } from './editcost-pondprepare/editcost-pondprepare.component';
import { PondprepareManagementService } from './pondprepare-management.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatSidenavModule,
    MatChipsModule,
    FormsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    PondprepareManagementRoutingModule
  ],
  declarations: [PondprepareManagementComponent, AddPondprepareComponent, EditPondprepareComponent, AddcostPondprepareComponent, EditcostPondprepareComponent],
  providers:[
    PondprepareManagementService
  ]
})
export class PondprepareManagementModule { }