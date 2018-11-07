import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesManagementRoutingModule } from './employees-management-routing.module';
import { EmployeesManagementComponent } from './employees-management.component';
import { MatDialogModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAccountEmployeesComponent } from './add-account-employees/add-account-employees.component';
import { EmployeesManagementService } from './employees-management.service';
import { DialogChangePondComponent } from './dialogChangePond.component';
import { AddPondUserRolesComponent } from './add-pond-user-roles/add-pond-user-roles.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxDatatableModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    EmployeesManagementRoutingModule
  ],
  providers:[
    EmployeesManagementService
  ],
  entryComponents: [EmployeesManagementComponent, DialogChangePondComponent, AddPondUserRolesComponent],
  declarations: [EmployeesManagementComponent, DialogChangePondComponent, AddAccountEmployeesComponent, AddPondUserRolesComponent]
})
export class EmployeesManagementModule { }
