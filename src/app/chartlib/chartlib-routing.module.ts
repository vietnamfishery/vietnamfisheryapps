import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartlibComponent } from './chartlib.component';

const routes: Routes = [
  {
    path: '',
    component: ChartlibComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartlibRoutingModule { }
