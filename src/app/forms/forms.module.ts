import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormTreeComponent } from './form-tree/form-tree.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FormValidationComponent } from './form-validation/form-validation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsRoutingModule
  ],
  declarations: [FormTreeComponent, FormUploadComponent, FormValidationComponent]
})
export class FormsModule { }
