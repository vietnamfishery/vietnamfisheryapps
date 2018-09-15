import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FullscreenOverlayContainer, OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import 'hammerjs';
import { MaterialRoutingModule } from './material-routing.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent, MatCheckboxDemoNestedChecklistComponent } from './checkbox/checkbox.component';
import { ChipsComponent } from './chips/chips.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogComponent, JazzDialogComponent, IFrameDialogComponent, ContentElementDialogComponent } from './dialog/dialog.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { RadioComponent } from './radio/radio.component';
import { RippleComponent } from './ripple/ripple.component';
import { SelectComponent } from './select/select.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SliderComponent } from './slider/slider.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabsComponent, SunnyTabContentComponent, RainyTabContentComponent, FoggyTabContentComponent } from './tabs/tabs.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipsComponent } from './tooltip/tooltip.component';
import { TypographyComponent } from './typography/typography.component';
import { TablePagesModule } from './table-pages/table-pages.module';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatTableModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { LayoutModule } from '@angular/cdk/layout';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule,
    TablePagesModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,

    LayoutModule,

    CdkTableModule,
    A11yModule,
    BidiModule,
    CdkAccordionModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    MaterialRoutingModule
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
  ],
  declarations: [
    AutocompleteComponent,
    ButtonComponent,
    ButtonToggleComponent,
    CardComponent,
    CheckboxComponent,
    ChipsComponent,
    DatepickerComponent,
    DialogComponent,
    DrawerComponent,
    ExpansionComponent,
    GridListComponent,
    InputComponent,
    ListComponent,
    MenuComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    RadioComponent,
    RippleComponent,
    SelectComponent,
    SlideToggleComponent,
    SliderComponent,
    SnackBarComponent,
    StepperComponent,
    MatCheckboxDemoNestedChecklistComponent,
    TabsComponent,
    ToolbarComponent,
    TooltipsComponent,
    SunnyTabContentComponent,
    RainyTabContentComponent,
    FoggyTabContentComponent,
    JazzDialogComponent,
    IFrameDialogComponent,
    ContentElementDialogComponent,
    TypographyComponent
  ],
  entryComponents: [
    DialogComponent,
    JazzDialogComponent,
    IFrameDialogComponent,
    ContentElementDialogComponent
  ],
  bootstrap: [
    DialogComponent
  ]
})
export class MaterialModule { }
