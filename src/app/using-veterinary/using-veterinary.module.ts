import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsingVeterinaryRoutingModule } from './using-veterinary-routing.module';
import { UsingVeterinaryComponent } from './using-veterinary.component';
import { ListPondComponent } from './list-pond/list-pond.component';
import { UsingVeterinayComponent } from './using-veterinay/using-veterinay.component';
import { MatIconModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatTabsModule, MatTooltipModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatSliderModule, MatCheckboxModule, MatSidenavModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatSnackBarModule, MatDatepickerModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
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
        MatDatepickerModule,
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
        UsingVeterinaryRoutingModule
    ],
    declarations: [UsingVeterinaryComponent, ListPondComponent, UsingVeterinayComponent]
})
export class UsingVeterinaryModule { }
