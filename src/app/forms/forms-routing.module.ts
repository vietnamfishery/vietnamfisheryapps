import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormTreeComponent } from './form-tree/form-tree.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'upload',
      component: FormUploadComponent
    }, {
      path: 'validation',
      component: FormValidationComponent
    }, {
      path: 'tree',
      component: FormTreeComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
