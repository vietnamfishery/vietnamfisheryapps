import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PondPrepareManagementComponent } from './pond-prepare-management.component';

const routes: Routes = [
  { 
     path: '', component: PondPrepareManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PondPrepareManagementRoutingModule { }
