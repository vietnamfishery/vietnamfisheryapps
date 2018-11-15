import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule, MatToolbarModule, MatProgressBarModule, MatCardModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatIconModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatCardModule,
        ChartsModule,
        FlexLayoutModule,
        CommonModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
