import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsingFoodRoutingModule } from './using-food-routing.module';
import { UsingFoodComponent } from './using-food.component';
import { UsingFoodService } from './using-food.service';
import { MatIconModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatTabsModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSliderModule, MatCheckboxModule, MatSidenavModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatSnackBarModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUsingFoodComponent } from './add-using-food/add-using-food.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AnalysisUsingFoodComponent } from './analysis-using-food/analysis-using-food.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarDialogComponent } from './analysis-using-food/dialog/component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatCardModule,
        ChartsModule,
        FlexLayoutModule,
        MatTabsModule,
        MatTooltipModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatListModule,
        MatSliderModule,
        MatCheckboxModule,
        MatSidenavModule,
        FormsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatFormFieldModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        UsingFoodRoutingModule
    ],
    declarations: [UsingFoodComponent, AddUsingFoodComponent, AnalysisUsingFoodComponent, CalendarDialogComponent],
    entryComponents: [CalendarDialogComponent],
    providers: [
        UsingFoodService
    ]
})
export class UsingFoodModule { }
