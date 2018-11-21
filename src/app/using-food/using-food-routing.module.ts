import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsingFoodComponent } from './using-food.component';
import { AddUsingFoodComponent } from './add-using-food/add-using-food.component';
import { AnalysisUsingFoodComponent } from './analysis-using-food/analysis-using-food.component';

const routes: Routes = [
    {
        path: '', component: UsingFoodComponent
    },
    {
        path: 'them/:pondUUId', component: AddUsingFoodComponent
    },
    {
        path: 'thong-ke/:pondUUId/:seasonUUId', component: AnalysisUsingFoodComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsingFoodRoutingModule { }
