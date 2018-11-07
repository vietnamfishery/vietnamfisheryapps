import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PondManagementComponent } from './pond-management.component';
import { AddPondComponent } from './add-pond/add-pond.component';
import { DetailPondComponent } from './detail-pond/detail-pond.component';

const routes: Routes = [
  {
    path: '',
    component: PondManagementComponent
  },
  { path: 'them-ao-nuoi', component: AddPondComponent },
  { path: 'chi-tiet-ao-nuoi/:pondUUId', component: DetailPondComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PondManagementRoutingModule { }
