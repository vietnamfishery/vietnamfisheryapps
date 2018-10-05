import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-add-pond',
  templateUrl: './add-pond.component.html',
  styleUrls: ['./add-pond.component.scss']
})
export class AddPondComponent implements OnInit {

  public form: FormGroup;
  // selected = 'option2';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      pond: [null, Validators.compose([Validators.required])],
      pondarea: [null, Validators.compose([Validators.required])],
      ponddepth: [null, Validators.compose([Validators.required])],
      pondstatus: [null, Validators.compose([Validators.required])]
    });
  }

  zoom: number = 10;
  // title: string = 'Địa chỉ trên bảng đồ';
  lat: number = 51.678418;
  lng: number = 7.809007;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    console.log($event);
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
	  {
		  lat: 10.03082457630006,
		  lng: 105.76896160840988,
		  label: 'Vo Hoai Phong',
		  draggable: true
	  }
  ]

}