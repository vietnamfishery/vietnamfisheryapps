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
import { AddFoodsComponent } from './foods-management/add-foods/add-foods.component';
import { AddVeterinaryComponent } from './veterinary-management/add-veterinary/add-veterinary.component';
import { AddMaterialsComponent } from './material-management/add-materials/add-materials.component';
import { AddBreedsComponent } from './breed-management/add-breeds/add-breeds.component';


const routes: Routes = [
    {
        path: '',
        component: StorageManagementComponent,
        children: [
            { path: '', component: FoodsManagementComponent },
            { path: 'thuc-an', component: FoodsManagementComponent },
            { path: 'co-so-vat-chat', component: MaterialManagementComponent },
            { path: 'thuoc-&-duoc-pham', component: VeterinaryManagementComponent },
            { path: 'giong-nuoi', component: BreedManagementComponent },
            {
                path: 'nhap-kho', component: ImportManagementComponent, children: [
                    {
                        path: 'thuc-an', component: AddFoodsComponent
                    },
                    {
                        path: 'thuoc-&-duoc-pham', component: AddVeterinaryComponent
                    },
                    {
                        path: 'co-so-vat-chat', component: AddMaterialsComponent
                    },
                    {
                        path: 'giong-nuoi', component: AddBreedsComponent
                    }
                ]
            }
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
