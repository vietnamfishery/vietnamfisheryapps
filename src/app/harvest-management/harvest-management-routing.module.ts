import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HarvestManagementComponent } from './harvest-management.component';
import { AdddetailHarvestComponent } from './adddetail-harvest/adddetail-harvest.component';
import { EditDetailHarvestComponent } from './edit-detail-harvest/edit-detail-harvest.component';
import { AnalysisHarvestComponent } from './analysis-harvest/analysis-harvest.component';

const routes: Routes = [
  { path: '', component: HarvestManagementComponent },
  { path: 'them/:pondUUId', component: AdddetailHarvestComponent },
  { path: 'thong-ke/:pondUUId/:seasonUUId', component: AnalysisHarvestComponent },
  { path: 'sua-chi-tiet-thu-hoach', component: EditDetailHarvestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarvestManagementRoutingModule { }
