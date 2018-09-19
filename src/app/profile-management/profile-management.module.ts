import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { ProfileManagementComponent } from './profile-management.component';
import { MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, MatInputModule, MatListModule, MatSlideToggleModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    FormsModule,
    NgxDatatableModule,
    FileUploadModule,
    MatNativeDateModule,
    ProfileManagementRoutingModule
  ],
  declarations: [ProfileManagementComponent, ProfileEditComponent]
})
export class ProfileManagementModule { }

