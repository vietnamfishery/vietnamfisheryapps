import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BlankComponent } from './blank/blank.component';
import { EditComponent } from './edit/edit.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [BlankComponent, EditComponent, InvoiceComponent, PricingComponent, TimelineComponent]
})
export class PagesModule { }
