import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChipsComponent } from './chips/chips.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogComponent } from './dialog/dialog.component';
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
import { TabsComponent } from './tabs/tabs.component';
import { TABS_ROUTES } from './tabs/routes';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipsComponent } from './tooltip/tooltip.component';
import { TypographyComponent } from './typography/typography.component';
import { TablePagesComponent } from './table-pages/table-pages.component';
import { TABLE_ROUTES } from './table-pages/table-pages-routing.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'autocomplete', component: AutocompleteComponent },
      { path: 'button', component: ButtonComponent },
      { path: 'button-toggle', component: ButtonToggleComponent },
      { path: 'card', component: CardComponent },
      { path: 'checkbox', component: CheckboxComponent },
      { path: 'chips', component: ChipsComponent },
      { path: 'datepicker', component: DatepickerComponent },
      { path: 'dialog', component: DialogComponent },
      { path: 'drawer', component: DrawerComponent },
      { path: 'expansion', component: ExpansionComponent },
      { path: 'grid-list', component: GridListComponent },
      { path: 'input', component: InputComponent },
      { path: 'list', component: ListComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'progress-bar', component: ProgressBarComponent },
      { path: 'progress-spinner', component: ProgressSpinnerComponent },
      { path: 'radio', component: RadioComponent },
      { path: 'ripple', component: RippleComponent },
      { path: 'select', component: SelectComponent },
      { path: 'slide-toggle', component: SlideToggleComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'snack-bar', component: SnackBarComponent },
      { path: 'stepper', component: StepperComponent },
      { path: 'table', component: TablePagesComponent, children: TABLE_ROUTES },
      { path: 'tabs', component: TabsComponent, children: TABS_ROUTES },
      { path: 'toolbar', component: ToolbarComponent },
      { path: 'tooltip', component: TooltipsComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'expansion', component: ExpansionComponent },
      { path: 'stepper', component: StepperComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
