import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './diary.component';
import { AddDiaryComponent } from './add-diary/add-diary.component';

const routes: Routes = [
    {
        path: '', component: DiaryComponent
    },
    {
        path: 'them/:pondUUId', component: AddDiaryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
