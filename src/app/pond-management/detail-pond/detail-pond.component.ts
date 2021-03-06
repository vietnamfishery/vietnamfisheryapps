import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { PondManagementService } from '../pond-management.service';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { tokenName } from 'src/app/constants/constant';

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
    imgSource: string; // để lưu id hình cũ nếu không cập nhật hình
    form: FormGroup;
    pond: Observable<any>;
    ownerId: number;
    pondUUId: string;
    token: string;
    isBoss: boolean = false;
    zoom: number = 10;
    lat: number = 10.03082457630006;
    lng: number = 105.76896160840988;
    markers: marker[] = [];
    private selectedFile: File = null;
    btnSave: boolean = false;
    btnEdit: boolean = false;
    selected: any = {};

    constructor(
        private fb: FormBuilder,
        private adapter: DateAdapter<any>,
        private pondManagementService: PondManagementService,
        private cd: ChangeDetectorRef,
        public snackBar: MatSnackBar,
        private appService: AppService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if(deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
        this.createForm();
        this.form.disable();
        this.pond = this.route.paramMap.pipe(
            switchMap(params => {
                this.pondUUId = params.get('pondUUId');
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })
        )
        this.pond.subscribe(res => {
            const pond = res.pond;
            this.imgSource = res.pond.images;
            this.pondManagementService.loadImage(pond.images).subscribe((response: any) => {
                this.imageLink = response.data;
            })
            const maker: any = {
                lat: pond.pondLatitude,
                lng: pond.pondLongitude,
                label: pond.pondName,
                draggable: false
            }
            this.markers.push(maker);
            this.lat = pond.pondLatitude ? pond.pondLatitude : null;
            this.lng = pond.pondLongitude ? pond.pondLongitude : null;
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
        this.btnEdit = !this.btnEdit;
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    createForm = () => {
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
    }

    mapClicked($event: any) {
        if(!this.isBoss) {
            return;
        }
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
        this.btnSave = !this.btnSave;
        this.btnEdit = !this.btnEdit;
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

    onSubmit() {
        const data: any = {
            pondUUId: this.pondUUId,
            ...this.form.value,
            images: this.selectedFile || this.imgSource
        }
        if(this.checkForm(this.form.controls.createCost.value, this.form.controls.pondArea.value, this.form.controls.pondDepth.value, this.form.controls.pondCreatedDate.value)) {
            this.pondManagementService.updatePond(data, this.token).subscribe((res) => {
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

}
