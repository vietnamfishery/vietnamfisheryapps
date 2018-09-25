import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesManagementRoutingModule } from './employees-management-routing.module';
import { EmployeesManagementComponent } from './employees-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { AddAccountEmployeesComponent } from './add-account-employees/add-account-employees.component';

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
    MatTableModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EmployeesManagementRoutingModule
  ],
  declarations: [EmployeesManagementComponent, AddAccountEmployeesComponent]
})
export class EmployeesManagementModule { }
