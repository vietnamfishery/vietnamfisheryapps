import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartlibRoutingModule } from './chartlib-routing.module';
import { ChartlibComponent } from './chartlib.component';
import { MatCardModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    MatCardModule,
    FlexLayoutModule,
    ChartlibRoutingModule
  ],
  declarations: [ ChartlibComponent ]
})
export class ChartlibModule { }
