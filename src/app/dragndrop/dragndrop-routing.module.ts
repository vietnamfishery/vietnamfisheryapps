import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragndropComponent } from './dragndrop.component';

const routes: Routes = [
  { path: '', component: DragndropComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragndropRoutingModule { }
