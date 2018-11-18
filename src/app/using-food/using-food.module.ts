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
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        UsingFoodRoutingModule
    ],
    declarations: [UsingFoodComponent, AddUsingFoodComponent],
    providers: [
        UsingFoodService
    ]
})
export class UsingFoodModule { }
