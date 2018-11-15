import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PondprepareManagementComponent } from './pondprepare-management.component';
import { AddPondprepareComponent } from './add-pondprepare/add-pondprepare.component';
import { EditPondprepareComponent } from './edit-pondprepare/edit-pondprepare.component';
import { AddcostPondprepareComponent } from './addcost-pondprepare/addcost-pondprepare.component';
import { EditcostPondprepareComponent } from './editcost-pondprepare/editcost-pondprepare.component';
import { ListPondComponent } from './list-pond/list-pond.component';
import { AddOldPondPrepareComponent } from './add-old-pond-prepare/add-old-pond-prepare.component';

const routes: Routes = [
    {
        path: '',
        component: PondprepareManagementComponent
    },
    {
        path: 'them',
        component: AddPondprepareComponent
    },
    {
        path: 'them/:pondUUId',
        component: AddOldPondPrepareComponent
    },
    {
        path: 'sua-chi-tiet-chuan-bi-ao/:pondPrepareId',
        component: EditPondprepareComponent
    },
    {
        path: 'them-chi-phi-phat-sinh',
        component: AddcostPondprepareComponent
    },
    {
        path: 'sua-chi-phi-phat-sinh',
        component: EditcostPondprepareComponent
    },
    {
        path: 'danh-sach-ao',
        component: ListPondComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PondprepareManagementRoutingModule { }
