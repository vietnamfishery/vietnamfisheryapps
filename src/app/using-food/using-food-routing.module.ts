import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsingFoodComponent } from './using-food.component';
import { ListPondComponent } from './list-pond/list-pond.component';
import { AddUsingFoodComponent } from './add-using-food/add-using-food.component';

const routes: Routes = [
    {
        path: '', component: UsingFoodComponent
    },
    {
        path: 'danh-sach-ao', component: ListPondComponent
    },
    {
        path: 'them/:pondUUId', component: AddUsingFoodComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsingFoodRoutingModule { }
