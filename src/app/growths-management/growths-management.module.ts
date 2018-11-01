import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowthsManagementRoutingModule } from './growths-management-routing.module';
import { GrowthsManagementComponent } from './growths-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatInputModule, MatNativeDateModule, MatListModule, MatSlideToggleModule, MatSidenavModule, MatDatepickerModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGrowthsComponent } from './add-growths/add-growths.component';
import { EditDetailGrowthsComponent } from './edit-detail-growths/edit-detail-growths.component';
import { GrowthsManagementService } from './growths-management.service';

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
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    GrowthsManagementRoutingModule
  ],
  declarations: [GrowthsManagementComponent, AddGrowthsComponent, EditDetailGrowthsComponent],
  providers: [GrowthsManagementService]
})
export class GrowthsManagementModule { }
