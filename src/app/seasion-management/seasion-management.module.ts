import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasionManagementRoutingModule } from './seasion-management-routing.module';
import { SeasionManagementComponent, DialogAddSeasion } from './seasion-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule, MatSidenavModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NgxDatatableModule,
    MatDialogModule,
    MatInputModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SeasionManagementRoutingModule
  ],
  entryComponents: [SeasionManagementComponent, DialogAddSeasion],
  declarations: [
    SeasionManagementComponent,
    DialogAddSeasion
  ],
  bootstrap: [SeasionManagementComponent]
})
export class SeasionManagementModule { }
