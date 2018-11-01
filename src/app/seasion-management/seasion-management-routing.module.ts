import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasionManagementComponent } from './seasion-management.component';
import { ListPondsComponent } from './list-ponds/list-ponds.component';
import { AddPondsComponent } from './add-ponds/add-ponds.component';

const routes: Routes = [
  {
    path: '',
    component: SeasionManagementComponent
  },
  { 
    path: 'danh-sach-ao-nuoi-cua-vu/:seasonId',
    component: ListPondsComponent 
  },
  { 
    path: 'them-ao-nuoi-vao-vu/:seasonId',
    component: AddPondsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasionManagementRoutingModule { }
