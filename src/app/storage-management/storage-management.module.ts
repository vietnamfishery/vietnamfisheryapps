import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageManagementRoutingModule } from './storage-management-routing.module';
import { StorageManagementComponent } from './storage-management.component';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { VeterinaryManagementComponent } from './veterinary-management/veterinary-management.component';
import { FoodsManagementComponent } from './foods-management/foods-management.component';
import { MatIconModule, MatToolbarModule, MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    StorageManagementRoutingModule
  ],
  declarations: [
    StorageManagementComponent, 
    MaterialManagementComponent, 
    VeterinaryManagementComponent, 
    FoodsManagementComponent
  ]
})
export class StorageManagementModule { }
