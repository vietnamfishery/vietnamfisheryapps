import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BlankComponent } from './blank/blank.component';
import { EditComponent } from './edit/edit.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatTabsModule, MatListModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    NgxDatatableModule,
    PagesRoutingModule
  ],
  declarations: [BlankComponent, EditComponent, InvoiceComponent, PricingComponent, TimelineComponent]
})
export class PagesModule { }
