import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsingVeterinaryRoutingModule } from './using-veterinary-routing.module';
import { UsingVeterinaryComponent } from './using-veterinary.component';
import { UsingVeterinayComponent } from './using-veterinay/using-veterinay.component';
import { MatIconModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatTabsModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSliderModule, MatCheckboxModule, MatSidenavModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatSnackBarModule, MatDatepickerModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AnalysisUsingVeterinaryComponent } from './analysis-using-veterinary/analysis-using-veterinary.component';
import { CalendarDialogComponent } from './analysis-using-veterinary/dialog/component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
        MatDatepickerModule,
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
        UsingVeterinaryRoutingModule
    ],
    declarations: [UsingVeterinaryComponent, UsingVeterinayComponent, AnalysisUsingVeterinaryComponent, CalendarDialogComponent],
    entryComponents: [CalendarDialogComponent]
})
export class UsingVeterinaryModule { }
