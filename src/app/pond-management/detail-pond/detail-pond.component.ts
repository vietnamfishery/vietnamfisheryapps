import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { PondManagementService } from '../pond-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-detail-pond',
  templateUrl: './detail-pond.component.html',
  styleUrls: ['./detail-pond.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class DetailPondComponent implements OnInit {
  imageLink: string = '';
  private errorFile: Promise<string> | null = null;
  preloader: boolean = false;
  timeOut: boolean = false;
  imgSource: string;
  form: FormGroup;
  pond: Observable<any>;
  pondId: any;
  token: string;
  constructor(
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private pondManagementService: PondManagementService,
    private cd: ChangeDetectorRef,
    private appService: AppService,
    private route: ActivatedRoute
  ) {
    this.token = this.appService.getCookie(tokenName);
  }

  ngOnInit() {
    this.form = this.fb.group({
      pondId: [null],
      pondName: [null, Validators.compose([Validators.required])],
      pondCreatedDate: [null, Validators.compose([Validators.required])],
      pondArea: [null, Validators.compose([Validators.required])],
      pondDepth: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      createCost: [null, Validators.compose([Validators.required])],
      pondLatitude: [null, Validators.compose([])],
      pondLongitude: [null, Validators.compose([])],
      images: [null, Validators.compose([])],
      imageDisable: [null, Validators.compose([])],
    });
    this.form.disable();
    this.pond = this.route.paramMap.pipe(
      switchMap(params => {
        this.pondId = params.get('pondId');
        return this.pondManagementService.getPondById(this.pondId, this.token);
      })
    )
    this.pond.subscribe();
    this.pondManagementService.getPondById(this.pondId, this.token).subscribe((val: any) => {
      const pond = val.pond;
      const maker: any = {
        lat: pond.pondLatitude,
        lng: pond.pondLongitude,
        label: pond.pondName,
        draggable: false
      }
      this.markers.push(maker);
      this.lat = pond.pondLatitude;
      this.lng = pond.pondLongitude;
      this.form.patchValue({
        pondName: pond.pondName,
        pondCreatedDate: pond.pondCreatedDate,
        pondArea: pond.pondArea,
        pondDepth: pond.pondDepth,
        createCost: pond.createCost,
        pondLatitude: pond.pondLatitude,
        pondLongitude: pond.pondLongitude,
        status: pond.status + '',
      });
    });
  }

  zoom: number = 10;
  lat: number = 10.03082457630006;
  lng: number = 105.76896160840988;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }


  mapClicked($event: any) {
    if(this.markers.length < 1){
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: false
      });
    }
    else {
      this.markers.pop();
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: false
      });
    }
    this.form.patchValue({
      pondLatitude: $event.coords.lat,
      pondLongitude: $event.coords.lng
    });
    console.log($event);
  }
  
  markers: marker[] = []

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }


  @ViewChild("name") nameField: ElementRef;
  editName(): void {
    this.nameField.nativeElement.focus();
  }

  changeEdit() {
    this.form.enable();
    this.editName();
  }

  checkFile(fileType: string): boolean {
    if (fileType.split('/')[0] === 'image') {
      return true;
    }
    return false;
  }

  getImage(): any {
    let styles = {
      'background-image': `url("${this.imageLink || "https://via.placeholder.com/360x360"}")`,
      'background-repeat': `no-repeat`,
      'background-size': `cover`,
      'background-position': 'center'
    };
    return styles;
  }

  onFileChange(event) {
    this.preloader = true;
    const token: string = this.appService.getCookie(tokenName);
    if (event.target.files && event.target.files.length) {
      const [files]: File[] = event.target.files;
      this.cd.markForCheck();
      if (this.checkFile(files.type)) {
        this.pondManagementService.uploadImage(files, token).subscribe((res: any) => {
          this.pondManagementService.loadImage(res.fileId).subscribe(data => {
            if (data) {
              this.imageLink = (data as any).data;
              this.preloader = !this.preloader;
            }
          });
          this.imgSource = res.fileId;
          console.log(res);
        })
      } else {
        this.timeOut = !this.timeOut;
        this.errorFile = Promise.resolve("Hình ảnh không được cho phép, vui lòng thử lại!")
        setTimeout(() => {
          this.timeOut = !this.timeOut;
        }, 5000);
        this.preloader = !this.preloader;
      }
    }
  }

  onSubmit() {
    this.form.patchValue({
      pondId: this.pondId
    });
    this.pondManagementService.updatePond(this.form.value, this.token).subscribe((res) => {
      if(res.success){
        console.log("cập nhật thành công");
      }else {
        console.log("cập nhật thất bại");
      }
    })
    console.log(this.form.value);

  }

}
