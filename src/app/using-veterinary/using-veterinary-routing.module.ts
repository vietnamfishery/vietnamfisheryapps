import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsingVeterinaryComponent } from './using-veterinary.component';
import { UsingVeterinayComponent } from './using-veterinay/using-veterinay.component';

const routes: Routes = [
    {
        path: '', component: UsingVeterinaryComponent
    },
    {
        path: 'them/:pondUUId', component: UsingVeterinayComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsingVeterinaryRoutingModule { }
