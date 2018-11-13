import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent, CalendarDialogComponent } from './diary.component';
import { DiaryService } from './diary.service';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatDialogModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddDiaryComponent } from './add-diary/add-diary.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatPaginatorModule,
        MatButtonModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatTableModule,
        FlexLayoutModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        DiaryRoutingModule
    ],
    declarations: [
        DiaryComponent,
        CalendarDialogComponent,
        AddDiaryComponent
    ],
    bootstrap: [
        DiaryComponent
    ],
    entryComponents: [
        DiaryComponent,
        CalendarDialogComponent
    ],
    providers: [
        DiaryService
    ]
})
export class DiaryModule { }
