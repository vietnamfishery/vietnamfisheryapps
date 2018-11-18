import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { ProfileManagementService } from '../profile-management.service';
import { AppService } from '../../../app/app.service';
import { Users } from '../../models/users';
import { tokenName } from '../../../environments';
import { distanceInWordsToNow } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortBy } from 'lodash';
import { Router } from '@angular/router';

const passwordchange = new FormControl('', Validators.required);
const confirmPasswordchange = new FormControl('', CustomValidators.equalTo(passwordchange));

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class ProfileEditComponent implements OnInit {
    public form: FormGroup;
    public form_Pass: FormGroup;
    private errorFile: Promise<string> | null = null;
    private updateErrorTimeout: boolean = false;
    private updateSuccessTimeout: boolean = false;
    timeOut: boolean = false;

    // for select field of form
    province: any[] = [];
    district: any[] = [];
    ward: any[] = [];
    preloader: boolean = false;

    imageLink: string = '';

    minDate = new Date(1940, 0, 1);
    maxDate = new Date();

    sortedOptions: Observable<any[]>;

    imgSource: string;
    constructor(
        private fb: FormBuilder,
        private fbPass: FormBuilder,
        private cd: ChangeDetectorRef,
        public snackBar: MatSnackBar,
        private appService: AppService,
        private router: Router,
        private adapter: DateAdapter<any>,
        private profileManagementService: ProfileManagementService
    ) {
        this.appService.getProvince().subscribe(pro => {
            this.province = this._sorter(pro, 'name');
        });
    }

    ngOnInit() {
        this.preloader = !this.preloader;
        this.createFormInfo();
        this.createFormPass();
        const token: string = this.appService.getCookie(tokenName);
        this.profileManagementService.getUserInfoWithUpdate(token).subscribe((val: Users) => {
            this.district.push((val as any).districts);
            this.ward.push((val as any).wards);
            this.form.patchValue({
                lastname: val.lastname,
                firstname: val.firstname,
                birthday: val.birthday,
                email: val.email,
                phone: val.phone,
                province: val.province,
                district: val.district,
                town: val.town,
                images: val.images
            });
        })
    }

    createFormInfo = () => {
        this.form = this.fb.group({
            lastname: [null, Validators.compose([Validators.required])],
            firstname: [null, Validators.compose([Validators.required])],
            birthday: [null, Validators.compose([Validators.required])],
            username: [null, Validators.compose([])],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            phone: [null, Validators.compose([Validators.required])],
            province: [{
                value: -1,
            }, Validators.compose([Validators.required])],
            district: [{
                value: -1
            }, Validators.compose([Validators.required])],
            town: [{
                value: -1
            }, Validators.compose([Validators.required])],
            images: [null, Validators.compose([])],
        });
    }

    createFormPass = () => {
        this.form_Pass = this.fbPass.group({
            oldPassword: [null, Validators.compose([Validators.required])],
            newPassword: passwordchange,
            confirmNewPassword: confirmPasswordchange,
        })
    }

    provinceChange() {
        this.form.controls.district.enable()
    }

    districtChange() {
        this.form.controls.town.enable();
    }

    loadDistrict(idPro) {
        if (idPro) {
            this.appService.getDistrictByProvinceId(idPro).subscribe(data => {
                this.district = this._sorter(data, 'name');
            })
        }
    }

    loadTown(idDis) {
        if (idDis) {
            this.appService.getWardByDistrictId(idDis).subscribe(data => {
                this.ward = this._sorter(data, 'name');
            })
        }
    }

    vietnamese() {
        this.adapter.setLocale('vi');
    }

    private _sorter(arr: Array<any>, name: string): Array<any> {
        return sortBy(arr, [
            (element) => {
                return element[name]
            }
        ])
    }

    onSubmit_info() {
        const token: string = this.appService.getCookie(tokenName);
        // this.form.patchValue({
        //     images: this.imgSource
        // })
        this.profileManagementService.updateUserInfo(this.form.value, token).subscribe((res: any) => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
                setTimeout(() => {
                    this.form_Pass.reset();
                    this.router.navigate(['thong-tin-ca-nhan']);
                }, 500);
                // this.updateSuccessTimeout = !this.updateSuccessTimeout;
                // setTimeout(() => {
                //     this.router.navigate(['thong-tin-ca-nhan']);
                // }, 1000);
            } else {
                // this.updateErrorTimeout = !this.updateErrorTimeout;
                // setTimeout(() => {
                //     this.updateErrorTimeout = !this.updateErrorTimeout;
                // }, 5000);
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            }
        })
    }

    onSubmit_Pass() {
        const token: string = this.appService.getCookie(tokenName);
        delete this.form_Pass.value.confirmNewPassword;
        this.profileManagementService.updateUserPassword(this.form_Pass.value, token).subscribe((res: any) => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
                setTimeout(() => {
                    this.form_Pass.reset();
                    this.router.navigate(['thong-tin-ca-nhan']);
                }, 500);
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            }
        });
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
}
