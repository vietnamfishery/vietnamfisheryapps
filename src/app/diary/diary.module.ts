import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { AddDiaryComponent } from './add-diary/add-diary.component';
import { MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSliderModule, MatCheckboxModule, MatSidenavModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DiaryService } from './diary.service';
import { DiaryAnalysisComponent } from './diary-analysis/diary-analysis.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarDialogComponent } from './diary-analysis/dialog/component';
import { FlatpickrModule } from 'angularx-flatpickr';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
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
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        NgxDatatableModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        DiaryRoutingModule
    ],
    declarations: [DiaryComponent, AddDiaryComponent, DiaryAnalysisComponent, CalendarDialogComponent],
    entryComponents: [
        DiaryComponent, AddDiaryComponent, DiaryAnalysisComponent, CalendarDialogComponent
    ],
    providers: [
        DiaryService
    ]
})
export class DiaryModule { }
