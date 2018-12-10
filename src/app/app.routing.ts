import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthGuard, AuthGuardBoss, AuthGuardPond, AuthGuardStorage, NotNullRoleGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
	{
		path: '',
		component: AdminLayoutComponent,
		canActivate: [NotNullRoleGuard, AuthGuard],
		children: [
			// {
			// 	path: '',
			// 	loadChildren: './home/home.module#HomeModule'
			// },
			{
				path: 'nhat-ky',
                loadChildren: './diary/diary.module#DiaryModule',
                canActivate: [AuthGuardPond]
			},
			{
				path: '',
                loadChildren: './pond-management/pond-management.module#PondManagementModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'quan-ly-ao',
                loadChildren: './pond-management/pond-management.module#PondManagementModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'quan-ly-vu-nuoi',
                loadChildren: './seasion-management/seasion-management.module#SeasionManagementModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'cho-an',
                loadChildren: './using-food/using-food.module#UsingFoodModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'su-dung-thuoc-&-duoc-pham',
                loadChildren: './using-veterinary/using-veterinary.module#UsingVeterinaryModule',
                canActivate: [AuthGuardPond]
			},
			{
				path: 'quan-ly-kho',
                loadChildren: './storage-management/storage-management.module#StorageManagementModule',
                canActivate: [AuthGuardStorage]
			},
			{
                path: 'quan-ly-chi-phi',
                loadChildren: './cost-management/cost-management.module#CostManagementModule',
                canActivate: [AuthGuardStorage]
			},
			{
				path: 'quan-ly-chat-thai',
                loadChildren: './waste-management/waste-management.module#WasteManagementModule',
                canActivate: [AuthGuardStorage]
			},
			{
				path: 'quan-ly-thu-hoach',
                loadChildren: './harvest-management/harvest-management.module#HarvestManagementModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'thong-tin-ca-nhan',
				loadChildren: './profile-management/profile-management.module#ProfileManagementModule'
			},
			{
				path: 'quan-ly-phan-quyen',
                loadChildren: './role-management/role-management.module#RoleManagementModule',
                canActivate: [AuthGuardBoss]
            },
			{
				path: 'quan-ly-phan-quyen-ao',
                loadChildren: './employees-management/employees-management.module#EmployeesManagementModule',
                canActivate: [AuthGuardBoss]
			},
			{
				path: 'quan-ly-tha-nuoi',
                loadChildren: './stocking-management/stocking-management.module#StockingManagementModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'quan-ly-tang-truong',
                loadChildren: './growths-management/growths-management.module#GrowthsManagementModule',
                canActivate: [AuthGuardPond]                
			},
			{
				path: 'quan-ly-chuan-bi-ao',
                loadChildren: './pondprepare-management/pondprepare-management.module#PondprepareManagementModule',
                canActivate: [AuthGuardPond]                
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
