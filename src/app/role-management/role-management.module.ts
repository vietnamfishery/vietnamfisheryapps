import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent } from './role-management.component';
import { MatSnackBarModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatNativeDateModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAddRoleEmpManagement } from './dialog-add-role-emp-management.component';
import { DialogAddRoleManagement } from './dialog-add-role-management.component';

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
    MatSnackBarModule,
    MatSelectModule,
    NgxDatatableModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RoleManagementRoutingModule
  ],
  entryComponents: [RoleManagementComponent, DialogAddRoleManagement, DialogAddRoleEmpManagement],
  declarations: [RoleManagementComponent, DialogAddRoleManagement, DialogAddRoleEmpManagement],
  bootstrap: [RoleManagementComponent],
  providers: [
    EmployeesManagementService
  ]
})
export class RoleManagementModule { }
