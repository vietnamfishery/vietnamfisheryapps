import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondManagementService } from '../pond-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { tokenName,  } from '../../constants/constant';
import { colors } from '../../constants/colors';

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
    private selectedFile: File = null;
    public form: FormGroup;
    imageLink: string = '';
    private errorFile: Promise<string> | null = null;
    preloader: boolean = false;
    timeOut: boolean = false;

    zoom: number = 10;
    lat: number = 10.81693812610545;
    lng: number = 106.54678354919656;

    imgSource: string;
    markers: Array<marker> = []
    token: string;

    snackBarRef: any;

    minDate = new Date(1940, 0, 1);
    maxDate = new Date();
    selected: any = {};

    constructor(
        private fb: FormBuilder,
        private pondManagementService: PondManagementService,
        private seasionManagementService: SeasionManagementService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private appService: AppService,
        private adapter: DateAdapter<any>,
        public snackBar: MatSnackBar
    ) {
        this.token = this.appService.getCookie(tokenName);
        this.seasionManagementService.getSeasonWithOwner(this.appService.getCookie(tokenName)).subscribe(res => {
            if(!res.success) {
                this.form.reset();
                this.snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    data: {
                        message: "Bạn chưa có vụ nuôi được kích hoạt. Chúng tôi sẽ chuyển bạn về chức năng",
                        destination: "quản lý vụ nuôi",
                        action: 'Đóng',
                        style: {
                            color: colors.yellow.primary
                        }
                    }
                });
                this.snackBarRef.instance.snackBarRefComponent = this.snackBarRef
            }
        })
    }

    ngOnInit() {
        this.preloader = !this.preloader;
        this.createForm();
    }

    createForm = () => {
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

    onSubmit() {
        if(this.form.invalid) {
            return this.snackBar.open('Vui lòng nhập đủ thông tin mẫu.', 'Đóng', {
                duration: 3000,
                horizontalPosition: "center",
                verticalPosition: 'top'
            });
        }
        const data: any = {
            ...this.form.value,
            images: this.selectedFile
        }
        if(this.checkForm(this.form.controls.createCost.value, this.form.controls.pondArea.value, this.form.controls.pondDepth.value, this.form.controls.pondCreatedDate.value)) {
            this.pondManagementService.addPond(data, this.token).subscribe((res) => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                    setTimeout(() => {
                        this.form.reset();
                        this.router.navigate(['quan-ly-ao']);
                    }, 500);
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                }
            });
        }
    }

    onFileChange(event) {
        this.preloader = true;
        if (event.target.files && event.target.files.length) {
            const [files]: File[] = event.target.files;
            this.cd.markForCheck();
            if (this.checkFile(files.type)) {
                this.selectedFile = files;
                this.pondManagementService.getBase64(files).then((base: string) => {
                    this.imageLink = base;
                });
            } else {
                this.snackBar.open("Hình ảnh không được cho phép, vui lòng thử lại!", 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                })
            }
        }
    }

    vietnamese() {
        this.adapter.setLocale('vn');
    }

    checkForm(cp: any, dt: any, ds: any, pondCreateDate: any) {
		const reg = new RegExp(/^\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/);
		if (!reg.test(cp) || !reg.test(dt) || !reg.test(ds)) {
			this.snackBar.open('Giá trị nhập phải là số và không âm, vui lòng kiểm tra lại!', 'Đóng', {
				duration: 2500,
				horizontalPosition: "center",
				verticalPosition: 'top'
			});
			return false;
        }
        if(new Date(pondCreateDate) > new Date()){
            this.snackBar.open('Ngày tạo ao không được lớn hơn ngày hiện tại, kiểm tra và nhập lại cảm ơn!', 'Đóng', {
				duration: 2500,
				horizontalPosition: "center",
				verticalPosition: 'top'
            });
            return false;
        }
        return true; 
	}
}