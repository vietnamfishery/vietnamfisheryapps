import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';

export const TABLE_ROUTES: Routes = [
  { path: '', redirectTo: 'main-demo', pathMatch: 'full' },
  { path: 'main-demo', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(TABLE_ROUTES)],
  exports: [RouterModule]
})
export class TablePagesRoutingModule { }
