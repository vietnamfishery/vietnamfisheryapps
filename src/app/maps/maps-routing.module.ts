import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapGoogleComponent } from './map-google/map-google.component';
import { MapLeafletComponent } from './map-leaflet/map-leaflet.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'google',
      component: MapGoogleComponent
    }, {
      path: 'leaflet',
      component: MapLeafletComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
