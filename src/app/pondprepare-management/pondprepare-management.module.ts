import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PondprepareManagementRoutingModule } from './pondprepare-management-routing.module';
import { PondprepareManagementComponent } from './pondprepare-management.component';
import { MatCardModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSidenavModule, MatSliderModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPondprepareComponent } from './add-pondprepare/add-pondprepare.component';
import { EditPondprepareComponent } from './edit-pondprepare/edit-pondprepare.component';
import { AddcostPondprepareComponent } from './addcost-pondprepare/addcost-pondprepare.component';
import { EditcostPondprepareComponent } from './editcost-pondprepare/editcost-pondprepare.component';

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
    FormsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    PondprepareManagementRoutingModule
  ],
  declarations: [PondprepareManagementComponent, AddPondprepareComponent, EditPondprepareComponent, AddcostPondprepareComponent, EditcostPondprepareComponent]
})
export class PondprepareManagementModule { }
