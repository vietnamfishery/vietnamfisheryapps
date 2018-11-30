import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './diary.component';
import { AddDiaryComponent } from './add-diary/add-diary.component';
import { DiaryAnalysisComponent } from './diary-analysis/diary-analysis.component';
import { AuthGuardPondWithUser } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: '', component: DiaryComponent
    },
    {
        path: 'them/:pondUUId', component: AddDiaryComponent, canActivate: [AuthGuardPondWithUser]
    },
    {
        path: 'thong-ke/:pondUUId/:seasonUUId', component: DiaryAnalysisComponent, canActivate: [AuthGuardPondWithUser]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
