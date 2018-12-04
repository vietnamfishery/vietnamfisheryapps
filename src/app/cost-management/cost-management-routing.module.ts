import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostManagementComponent } from './cost-management.component';
import { HarvestManagementComponent } from './harvest-management/harvest-management.component';
import { CostPondprepareComponent } from './cost-pondprepare/cost-pondprepare.component';
import { CostTakecareofComponent } from './cost-takecareof/cost-takecareof.component';

const routes: Routes = [
  {
    path: '',
    component: CostManagementComponent,
    children: [
      { path: '', component: CostPondprepareComponent },
      { path: 'chi-phi-nhap-kho', component: CostPondprepareComponent },
      { path: 'thu-hoach', component: HarvestManagementComponent },
      { path: 'chi-phi-nhap-giong', component: CostTakecareofComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostManagementRoutingModule { }
