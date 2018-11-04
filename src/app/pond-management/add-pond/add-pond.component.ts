import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondManagementService } from '../pond-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { Router } from '@angular/router';

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
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class AddPondComponent implements OnInit {
  private selectedFile: Promise<string> | null = null;
  public form: FormGroup;
  imageLink: string = '';
  private errorFile: Promise<string> | null = null;
  preloader: boolean = false;
  timeOut: boolean = false;

  // ErrorTimeout: boolean = false;
  // SuccessTimeout: boolean = false;
  imgSource: string;

  constructor(
    private fb: FormBuilder,
    private pondManagementService: PondManagementService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private appService: AppService,
    private adapter: DateAdapter<any>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.preloader = !this.preloader;

    this.form = this.fb.group({
      pondName: [null, Validators.compose([Validators.required])],
      pondCreatedDate: [null, Validators.compose([Validators.required])],
      pondArea: [null, Validators.compose([Validators.required])],
      pondDepth: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      createCost: [null, Validators.compose([Validators.required])],
      pondLatitude: [null, Validators.compose([])],
      pondLongitude: [null, Validators.compose([])],
      images: [null, Validators.compose([])],
    });
  }

  zoom: number = 10;
  lat: number = 10.81693812610545;
  lng: number = 106.54678354919656;

  mapClicked($event: any) {
    if (this.markers.length < 1) {
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

  markers: Array<marker> = []

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

  onSubmit() {
    const token: string = this.appService.getCookie(tokenName);
    this.pondManagementService.addPond(this.form.value, token).subscribe((res) => {
      console.log(this.form.value);
      if (res.success) {
        this.form.reset();
        this.snackBar.open(res.message, 'Đóng', {
          duration: 3000,
          horizontalPosition: "right"
        });
        setTimeout(() => {
          this.router.navigate(['quan-ly-ao']);
        }, 3200);
      } else {
        this.form.reset();
        this.snackBar.open(res.message, 'Đóng', {
          duration: 3000,
          horizontalPosition: "right"
        });
      }
    });
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

  vietnamese() {
    this.adapter.setLocale('vn');
  }
}