import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormTreeComponent } from './form-tree/form-tree.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { MatCardModule, MatIconModule, MatInputModule, MatButtonModule, MatRadioModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TreeModule,
    FormsRoutingModule
  ],
  declarations: [FormTreeComponent, FormUploadComponent, FormValidationComponent]
})
export class FormsModule { }
