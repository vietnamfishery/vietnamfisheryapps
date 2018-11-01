import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WasteManagementRoutingModule } from './waste-management-routing.module';
import { WasteManagementComponent } from './waste-management.component';
import { MatToolbarModule, MatCardModule, MatIconModule, MatTooltipModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatExpansionModule, MatSidenavModule, MatCheckboxModule, MatRadioModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WasteEditComponent } from './waste-edit/waste-edit.component';
import { WasteAddComponent } from './waste-add/waste-add.component';
import { WasteManagementService } from './waste-management.service';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule,
    WasteManagementRoutingModule
  ],
  declarations: [WasteManagementComponent, WasteEditComponent, WasteAddComponent],
  providers: [WasteManagementService]
})
export class WasteManagementModule { }
