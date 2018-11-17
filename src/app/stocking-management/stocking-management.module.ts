import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockingManagementRoutingModule } from './stocking-management-routing.module';
import { StockingManagementComponent } from './stocking-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatRadioModule, MatProgressBarModule, MatSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStockingComponent } from './add-stocking/add-stocking.component';
import { EditStockingComponent } from './edit-stocking/edit-stocking.component';
import { StockingService } from './stocking.service';
import { ListPondComponent } from './list-pond/list-pond.component';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTooltipModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressBarModule,
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
    declarations: [StockingManagementComponent, AddStockingComponent, EditStockingComponent, ListPondComponent],
    providers: [
        StockingService
    ]
})
export class StockingManagementModule { }
