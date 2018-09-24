import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PondprepareManagementComponent } from './pondprepare-management.component';
import { AddPondprepareComponent } from './add-pondprepare/add-pondprepare.component';
import { EditPondprepareComponent } from './edit-pondprepare/edit-pondprepare.component';
import { AddcostPondprepareComponent } from './addcost-pondprepare/addcost-pondprepare.component';

const routes: Routes = [
  {
    path: '',
    component: PondprepareManagementComponent
  },
  {
    path: 'them-chi-tiet-chuan-bi-ao',
    component: AddPondprepareComponent
  },
  {
    path: 'sua-chi-tiet-chuan-bi-ao',
    component: EditPondprepareComponent
  },
  {
    path: 'them-chi-phi-phat-sinh',
    component: AddcostPondprepareComponent
  },
  {
    path: 'sua-chi-phi-phat-sinh',
    component: AddcostPondprepareComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PondprepareManagementRoutingModule { }
