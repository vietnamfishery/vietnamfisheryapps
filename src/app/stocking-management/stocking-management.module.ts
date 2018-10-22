import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockingManagementRoutingModule } from './stocking-management-routing.module';
import { StockingManagementComponent } from './stocking-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatRadioModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStockingComponent } from './add-stocking/add-stocking.component';
import { EditStockingComponent } from './edit-stocking/edit-stocking.component';

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
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatRadioModule,
    StockingManagementRoutingModule
  ],
  declarations: [StockingManagementComponent, AddStockingComponent, EditStockingComponent],
  providers:[
    
  ]
})
export class StockingManagementModule { }
