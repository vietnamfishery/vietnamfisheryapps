import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapGoogleComponent } from './map-google/map-google.component';
import { MapLeafletComponent } from './map-leaflet/map-leaflet.component';

@NgModule({
  imports: [
    CommonModule,
    MapsRoutingModule
  ],
  declarations: [MapGoogleComponent, MapLeafletComponent]
})
export class MapsModule { }
