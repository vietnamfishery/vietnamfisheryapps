import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePagesComponent } from './table-pages.component';
import { TableComponent } from './table/table.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatRadioModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule
  ],
  declarations: [TablePagesComponent, TableComponent, TableHeaderComponent]
})
export class TablePagesModule { }
