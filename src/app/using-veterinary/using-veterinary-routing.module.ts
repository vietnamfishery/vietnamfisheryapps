import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsingVeterinaryComponent } from './using-veterinary.component';
import { UsingVeterinayComponent } from './using-veterinay/using-veterinay.component';
import { AnalysisUsingVeterinaryComponent } from './analysis-using-veterinary/analysis-using-veterinary.component';

const routes: Routes = [
    {
        path: '', component: UsingVeterinaryComponent
    },
    {
        path: 'them/:pondUUId', component: UsingVeterinayComponent
    },
    {
        path: 'thong-ke/:pondUUId/:seasonUUId', component: AnalysisUsingVeterinaryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsingVeterinaryRoutingModule { }
