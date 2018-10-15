import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
	{
		path: '',
		component: AdminLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
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
			},
			{
				path: 'quan-ly-nhan-vien',
				loadChildren: './employees-management/employees-management.module#EmployeesManagementModule'
			},
			{
				path: 'quan-ly-tha-nuoi',
				loadChildren: './stocking-management/stocking-management.module#StockingManagementModule'
			},
			{
				path: 'quan-ly-tang-truong',
				loadChildren: './growths-management/growths-management.module#GrowthsManagementModule'
			},
			{
				path: 'quan-ly-chuan-bi-ao',
				loadChildren: './pondprepare-management/pondprepare-management.module#PondprepareManagementModule'
			}
		]
	},
	{
		path: '',
		component: AuthLayoutComponent,
		children: [
			{
				path: 'session',
				loadChildren: './session/session.module#SessionModule'
			}
		]
	},
	{
		path: '**',
		redirectTo: 'session/404'
	}
];
