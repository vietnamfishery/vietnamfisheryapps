import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesManagementComponent } from './employees-management.component';
import { AddAccountEmployeesComponent } from './add-account-employees/add-account-employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesManagementComponent
  },
  {
    path: 'them-tai-khoan',
    component: AddAccountEmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesManagementRoutingModule { }
