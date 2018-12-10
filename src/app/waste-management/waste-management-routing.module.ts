import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WasteManagementComponent } from './waste-management.component';
import { WasteEditComponent } from './waste-edit/waste-edit.component';
import { WasteAddComponent } from './waste-add/waste-add.component';
import { ListPondComponent } from './list-pond/list-pond.component';

const routes: Routes = [
    {
        path: '',
        component: WasteManagementComponent
    },
    {
        path: 'cap-nhat/:diedFisheryUUId',
        component: WasteEditComponent
    },
    {
        path: 'them/:pondUUId',
        component: WasteAddComponent
    },
    {
        path: 'danh-sach-ao/:seasonUUId',
        component: ListPondComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WasteManagementRoutingModule { }
