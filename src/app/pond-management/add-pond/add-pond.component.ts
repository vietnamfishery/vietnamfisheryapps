import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondManagementService } from '../pond-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-add-pond',
  templateUrl: './add-pond.component.html',
  styleUrls: ['./add-pond.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class AddPondComponent implements OnInit {
  private selectedFile: Promise<string> | null = null;
  public form: FormGroup;
  // selected = 'option2';
  constructor(
    private fb: FormBuilder,
    private pondManagementService: PondManagementService,
    private cd: ChangeDetectorRef,
    private adapter: DateAdapter<any>
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      pond: [null, Validators.compose([Validators.required])],
      pond_date: [null, Validators.compose([Validators.required])],
      pondarea: [null, Validators.compose([Validators.required])],
      ponddepth: [null, Validators.compose([Validators.required])],
      pondstatus: [null, Validators.compose([Validators.required])],
      image: [null, Validators.compose([Validators.required])],
      files: [null, Validators.required],
    });
  }

  zoom: number = 10;
  // title: string = 'Địa chỉ trên bảng đồ';
  lat: number = 21.023874542759508;
  lng: number = 105.80530600759744;

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

  onSubmit(){
    const pond = this.form.value;
    console.log(pond);
    this.pondManagementService.addpond(pond).subscribe();
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.form.patchValue({
          files: reader.result
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
    this.selectedFile = new Promise((resolve, reject) => {
      resolve(this.form.value.image.split('\\')[this.form.value.image.split('\\').length -1].toString())
    });
  }

}