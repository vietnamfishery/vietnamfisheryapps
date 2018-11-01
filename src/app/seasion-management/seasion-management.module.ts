import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasionManagementRoutingModule } from './seasion-management-routing.module';
import { SeasionManagementComponent, DialogAddSeasion } from './seasion-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule, MatSidenavModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDatepickerModule, MatChipsModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasionManagementService } from './seasion-management.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ListPondsComponent } from './list-ponds/list-ponds.component';
import { AddPondsComponent } from './add-ponds/add-ponds.component';
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
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    SeasionManagementRoutingModule
  ],
  entryComponents: [SeasionManagementComponent, DialogAddSeasion],
  declarations: [
    SeasionManagementComponent,
    DialogAddSeasion,
    ListPondsComponent,
    AddPondsComponent
  ],
  bootstrap: [SeasionManagementComponent],
  providers: [SeasionManagementService]
})
export class SeasionManagementModule { }
