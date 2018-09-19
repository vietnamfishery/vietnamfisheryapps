import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileManagementComponent } from './profile-management.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementComponent
  },
  {
    path: 'chinh-sua-thong-tin',
    component: ProfileEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementRoutingModule { }
