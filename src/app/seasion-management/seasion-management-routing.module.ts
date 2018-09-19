import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasionManagementComponent } from './seasion-management.component';

const routes: Routes = [
  {
    path: '',
    component: SeasionManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasionManagementRoutingModule { }
