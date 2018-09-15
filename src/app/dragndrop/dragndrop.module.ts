import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragndropRoutingModule } from './dragndrop-routing.module';
import { MatIconModule, MatCheckboxModule, MatCardModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragulaModule } from 'ng2-dragula';
import { DragndropComponent } from './dragndrop.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    FlexLayoutModule,
    DragulaModule.forRoot(),
    DragndropRoutingModule
  ],
  declarations: [
    DragndropComponent
  ]
})
export class DragndropModule { }
