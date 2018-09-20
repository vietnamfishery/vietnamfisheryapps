import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { TableEditingComponent } from './table-editing/table-editing.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TablePagingComponent } from './table-paging/table-paging.component';
import { TablePinningComponent } from './table-pinning/table-pinning.component';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { TableSortingComponent } from './table-sorting/table-sorting.component';
import { MatInputModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    NgxDatatableModule,
    TablesRoutingModule
  ],
  declarations: [DataTableComponent, TableEditingComponent, TableFilterComponent, TablePagingComponent, TablePinningComponent, TableSelectionComponent, TableSortingComponent]
})
export class TablesModule { }