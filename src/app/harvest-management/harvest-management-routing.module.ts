import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HarvestManagementComponent } from './harvest-management.component';
import { AdddetailHarvestComponent } from './adddetail-harvest/adddetail-harvest.component';
import { EditDetailHarvestComponent } from './edit-detail-harvest/edit-detail-harvest.component';

const routes: Routes = [
  { path: '', component: HarvestManagementComponent },
  { path: 'them-chi-tiet-thu-hoach', component: AdddetailHarvestComponent },
  { path: 'sua-chi-tiet-thu-hoach', component: EditDetailHarvestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarvestManagementRoutingModule { }
