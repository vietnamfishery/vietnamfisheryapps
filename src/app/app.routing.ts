import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'apps',
    loadChildren: './apps/apps.module#AppsModule'
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
    path: 'thong-tin-ca-nhan',
    loadChildren: './profile-management/profile-management.module#ProfileManagementModule'
  },
  {
    path: 'widgets',
    loadChildren: './widgets/widgets.module#WidgetsModule'
  }, {
    path: 'material',
    loadChildren: './material/material.module#MaterialModule'
  }, {
    path: 'ecommerce',
    loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
  }, {
    path: 'taskboard',
    loadChildren: './taskboard/taskboard.module#TaskboardModule'
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormModule'
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule'
  }, {
    path: 'charts',
    loadChildren: './chartlib/chartlib.module#ChartlibModule'
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapModule'
  }, {
    path: 'dragndrop',
    loadChildren: './dragndrop/dragndrop.module#DragndropModule'
  }, 
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
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
