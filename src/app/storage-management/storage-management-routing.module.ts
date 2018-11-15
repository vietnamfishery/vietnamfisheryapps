import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { FoodsManagementComponent } from './foods-management/foods-management.component';
import { VeterinaryManagementComponent } from './veterinary-management/veterinary-management.component';
import { StorageManagementComponent } from './storage-management.component';
import { BreedManagementComponent } from './breed-management/breed-management.component';
import { ImportManagementComponent } from './import-management/import-management.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { ChangePriceManagementComponent } from './change-price-management/change-price-management.component';


const routes: Routes = [
    {
        path: '',
        component: StorageManagementComponent,
        children: [
            { path: '', component: FoodsManagementComponent },
            { path: 'thuc-an', component: FoodsManagementComponent },
            { path: 'co-so-vat-chat', component: MaterialManagementComponent },
            { path: 'thuoc-va-duoc-pham', component: VeterinaryManagementComponent },
            { path: 'giong-nuoi', component: BreedManagementComponent },
            { path: 'nhap-kho/:type', component: ImportManagementComponent }
        ]
    },
    {
        path: 'lich-su-nhap-kho',
        component: CouponManagementComponent
    },
    {
        path: 'bien-dong-gia',
        component: ChangePriceManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StorageManagementRoutingModule { }
