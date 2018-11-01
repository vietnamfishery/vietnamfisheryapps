import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WasteManagementComponent } from './waste-management.component';
import { WasteEditComponent } from './waste-edit/waste-edit.component';
import { WasteAddComponent } from './waste-add/waste-add.component';

const routes: Routes = [
  {
    path: '',
    component: WasteManagementComponent
  },
  {
    path: 'sua-thong-tin-chat-thai/:diedFisheryId',
    component: WasteEditComponent
  },
  {
    path: 'them-thong-tin-chat-thai',
    component: WasteAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WasteManagementRoutingModule { }
