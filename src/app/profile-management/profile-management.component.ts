import { Component, OnInit } from '@angular/core';


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {

  pieChartColors: any[] = [{
    backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
  }];

  pieOptions: any = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };

  zoom: number = 10;
  title: string = 'ĐỊA CHỈ TRÊN BẢN ĐỒ';
  lat: number = 10.036344152103853;
  lng: number = 105.78569861415724;

  
  constructor() { 

  }

  ngOnInit() {
  }


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
