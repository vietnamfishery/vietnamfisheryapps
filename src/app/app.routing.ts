import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './diary/diary.module#DiaryModule'
    },
    {
      path: 'ghi-nhat-ky',
      loadChildren: './diary/diary.module#DiaryModule'
    },
    {
      path: 'quan-ly-ao',
      loadChildren: './pond-management/pond-management.module#PondManagementModule'
    },
    {
      path: 'quan-ly-vu-nuoi',
      loadChildren: './seasion-management/seasion-management.module#SeasionManagementModule'
    },
    {
      path: 'quan-ly-kho',
      loadChildren: './storage-management/storage-management.module#StorageManagementModule'
    },
    {
      path: 'quan-ly-chi-phi',
      loadChildren: './cost-management/cost-management.module#CostManagementModule'
    },
    {
      path: 'quan-ly-chat-thai',
      loadChildren: './waste-management/waste-management.module#WasteManagementModule'
    },
    {
      path: 'quan-ly-thu-hoach',
      loadChildren: './harvest-management/harvest-management.module#HarvestManagementModule'
    },
    {
      path: 'thong-tin-ca-nhan',
      loadChildren: './profile-management/profile-management.module#ProfileManagementModule'
    },
    {
      path: 'quan-ly-phan-quyen',
      loadChildren: './role-management/role-management.module#RoleManagementModule'
    }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'session',
      loadChildren: './session/session.module#SessionModule'
    }]
  }, {
    path: '**',
    redirectTo: 'session/404'
  }];
