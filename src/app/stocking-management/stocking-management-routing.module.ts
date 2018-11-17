import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockingManagementComponent } from './stocking-management.component';
import { AddStockingComponent } from './add-stocking/add-stocking.component';
import { EditStockingComponent } from './edit-stocking/edit-stocking.component';
import { ListPondComponent } from './list-pond/list-pond.component';

const routes: Routes = [
    {
        path: '',
        component: StockingManagementComponent
    },
    {
        path: 'tha-giong/:pondUUId',
        component: AddStockingComponent
    },
    {
        path: 'cap-nhat/:stockingDetailUUId',
        component: EditStockingComponent
    },
    {
        path: 'danh-sach-ao',
        component: ListPondComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockingManagementRoutingModule { }
