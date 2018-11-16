import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrowthsManagementComponent } from './growths-management.component';
import { AddGrowthsComponent } from './add-growths/add-growths.component';
import { EditDetailGrowthsComponent } from './edit-detail-growths/edit-detail-growths.component';

const routes: Routes = [
    {
        path: '',
        component: GrowthsManagementComponent
    },
    {
        path: 'them',
        component: AddGrowthsComponent
    },
    {
        path: 'chinh-sua/:growthUUId',
        component: EditDetailGrowthsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrowthsManagementRoutingModule { }
