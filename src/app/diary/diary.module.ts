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
        NgxDatatableModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        DiaryRoutingModule
    ],
    declarations: [DiaryComponent, AddDiaryComponent],
    providers: [
        DiaryService
    ]
})
export class DiaryModule { }
