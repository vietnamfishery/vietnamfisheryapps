import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockingManagementComponent } from './stocking-management.component';
import { AddStockingComponent } from './add-stocking/add-stocking.component';
import { EditStockingComponent } from './edit-stocking/edit-stocking.component';

const routes: Routes = [
  {
    path: '',
    component: StockingManagementComponent
  },
  {
    path: 'them-thong-tin-tha-nuoi',
    component: AddStockingComponent
  },
  {
    path: 'sua-thong-tin-tha-nuoi',
    component: EditStockingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockingManagementRoutingModule { }
