import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostManagementComponent } from './cost-management.component';
import { HarvestManagementComponent } from './harvest-management/harvest-management.component';
import { TotalComponent } from './total/total.component';

const routes: Routes = [
  {
    path: '',
    component: CostManagementComponent,
    children: [
      { path: '', component: TotalComponent },
      { path: 'tong-chi-phi', component: TotalComponent },
      { path: 'thu-hoach', component: HarvestManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostManagementRoutingModule { }
