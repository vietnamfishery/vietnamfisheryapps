import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PondPrepareCaptureComponent } from './pond-prepare-capture/pond-prepare-capture.component';
import { PondPrepareListComponent } from './pond-prepare-list/pond-prepare-list.component';
import { PondPrepareDetailComponent } from './pond-prepare-detail/pond-prepare-detail.component';

const routes: Routes = [
  { 
    path: '', component: PondPrepareListComponent
  },
  {
    path: 'them-chi-tiet-chuan-bi-ao-nuoi', component: PondPrepareCaptureComponent
  },
  {
    path: 'chi-tiet-chuan-bi-ao-nuoi', component: PondPrepareDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PondPrepareManagementRoutingModule { }
