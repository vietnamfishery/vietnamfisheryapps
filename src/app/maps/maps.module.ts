import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapGoogleComponent } from './map-google/map-google.component';
import { MapLeafletComponent } from './map-leaflet/map-leaflet.component';
import { MatCardModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    FlexLayoutModule,
    AgmCoreModule,
    LeafletModule.forRoot(),
    MapsRoutingModule
  ],
  declarations: [MapGoogleComponent, MapLeafletComponent]
})
export class MapModule { }
