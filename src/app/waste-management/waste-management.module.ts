import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WasteManagementRoutingModule } from './waste-management-routing.module';
import { WasteManagementComponent } from './waste-management.component';
import { MatToolbarModule, MatCardModule, MatIconModule, MatTooltipModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatExpansionModule, MatSidenavModule, MatCheckboxModule, MatRadioModule, MatSnackBarModule, MatProgressBarModule, MatTabsModule, MatButtonToggleModule, MatListModule, MatSliderModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WasteEditComponent } from './waste-edit/waste-edit.component';
import { WasteAddComponent } from './waste-add/waste-add.component';
import { WasteManagementService } from './waste-management.service';
import { ListPondComponent } from './list-pond/list-pond.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
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
        WasteManagementRoutingModule
    ],
    declarations: [WasteManagementComponent, WasteEditComponent, WasteAddComponent, ListPondComponent],
    providers: [WasteManagementService]
})
export class WasteManagementModule { }
