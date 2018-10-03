import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent, DialogAddRoleManagement } from './role-management.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RoleManagementRoutingModule
  ],
  entryComponents: [RoleManagementComponent, DialogAddRoleManagement],
  declarations: [RoleManagementComponent, DialogAddRoleManagement],
  bootstrap: [RoleManagementComponent]
})
export class RoleManagementModule { }
