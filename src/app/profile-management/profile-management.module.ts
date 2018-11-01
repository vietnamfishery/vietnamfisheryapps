import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { ProfileManagementComponent } from './profile-management.component';
import { MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, MatInputModule, MatListModule, MatSlideToggleModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { AgmCoreModule } from '@agm/core';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ProfileManagementService } from './profile-management.service';
import { FileNamePipe } from './file-name.pipe';

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
    ReactiveFormsModule,
    ProfileManagementRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBV-uHTqX6aH5_16ZmLa9uv16Op_R4t-1Y'
    }),
    MatFileUploadModule,
    MatSelectModule
  ],
  declarations: [ProfileManagementComponent, ProfileEditComponent, FileNamePipe],
  providers:[
    ProfileManagementService
  ]
})
export class ProfileManagementModule { }

