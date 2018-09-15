import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    ChartsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    DashboardRoutingModule
  ],
  declarations: []
})
export class DashboardModule { }
