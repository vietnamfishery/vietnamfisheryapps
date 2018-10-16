import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { ProfileManagementService } from '../profile-management.service';
import { AppService } from '../../../app/app.service';
import { IUsers } from '../../models/users';
import { tokenName } from '../../../environments';
import { distanceInWordsToNow } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortBy } from 'lodash';

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
    private selectedFile: Promise<string> | null = null;

    // for select field of form
    province: any[];
    district: any[];
    ward: any[];

    minDate = new Date(1940, 0, 1);
    maxDate = new Date();

    sortedOptions: Observable<any[]>;

    constructor(
        private fb: FormBuilder,
        private fbPass: FormBuilder,
        private cd: ChangeDetectorRef,
        private appService: AppService,
        private adapter: DateAdapter<any>,
        private profileManagementService: ProfileManagementService
    ) {
        this.appService.getProvince().subscribe(pro => {
            this.province = this._sorter(pro, 'name');
        });

        // this.appService.getDistrict().subscribe(dis => {
        //     this.district = this._sorter(dis, 'name');
        // });

        // this.appService.getWard().subscribe(ward => {
        //     this.ward = this._sorter(ward, 'name');
        // });
    }

    ngOnInit() {
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
            files: [null, Validators.compose([])],
            image: [null, Validators.compose([])],
        });
        this.form_Pass = this.fbPass.group({
            passwordhistory: [null, Validators.compose([Validators.required])],
            passwordchange: passwordchange,
            confirmPasswordchange: confirmPasswordchange,
        })
        const token: string = this.appService.getCookie(tokenName);
        this.profileManagementService.getUserInfo(token).subscribe((val: IUsers) => {
            this.form.patchValue({
                lastname: val.lastname,
                firstname: val.firstname,
                birthday: val.birthday,
                email: val.email,
                phone: val.phone,
                province: val.province,
                district: val.district,
                town: val.town,
            });
        })
    }

    onFileChange(event) {
        if (event.target.files && event.target.files.length) {
            const [files]: File[] = event.target.files;
            this.form.patchValue({
                files
            });
            this.cd.markForCheck();
        }
        this.selectedFile = new Promise((resolve, reject) => {
            resolve(this.form.value.image.split('\\')[this.form.value.image.split('\\').length - 1].toString())
        });
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

    displayFn(obj: any): string {
        return obj.name;
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
        // console.log(this.form.value);
        this.profileManagementService.updateUserInfo(this.form.value, token).subscribe((res: IUsers) => {
            console.log(res);
        })
    }

    onSubmit_Pass() {
        delete this.form_Pass.value.confirmPasswordchange;
        console.log(this.form_Pass.value)
    }
}
