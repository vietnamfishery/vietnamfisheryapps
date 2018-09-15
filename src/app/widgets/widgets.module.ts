import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { WidgetsComponent } from './widgets.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    ChartsModule,
    FlexLayoutModule,
    AgmCoreModule,
    WidgetsRoutingModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
