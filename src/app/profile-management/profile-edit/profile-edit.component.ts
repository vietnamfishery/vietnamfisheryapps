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


const passwordhistory = new FormControl('', Validators.required);
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
    town: any[];

    minDate = new Date(1940, 0, 1);
    maxDate = new Date();

    constructor(
        private fb: FormBuilder,
        private fbPass: FormBuilder,
        private cd: ChangeDetectorRef,
        private appService: AppService,
        private adapter: DateAdapter<any>,
        private profileManagementService: ProfileManagementService
    ) {
        this.appService.getProvince().subscribe(pro => {
            this.province = pro;
        });
    }

    ngOnInit() {
        this.form = this.fb.group({
            lastname: [null, Validators.compose([Validators.required])],
            firstname: [null, Validators.compose([Validators.required])],
            birthday: [null, Validators.compose([Validators.required])],
            username: [null, Validators.compose([])],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            phone: [null, Validators.compose([Validators.required])],
            province: [null, Validators.compose([Validators.required])],
            district: [null, Validators.compose([Validators.required])],
            town: [null, Validators.compose([Validators.required])],
            files: [null, Validators.compose([Validators.required])],
            image: [null, Validators.compose([])],
        });
        this.form_Pass = this.fbPass.group({
            passwordhistory: passwordhistory,
            passwordchange: passwordchange,
            confirmPasswordchange: confirmPasswordchange
        });
        const token: string = this.appService.getCookie(tokenName);
        this.profileManagementService.getUserInfo(token).subscribe((val: IUsers )=> {
            this.form.patchValue({
                lastname: val.lastname,
                firstname: val.firstname,
                birthday: val.birthday,
                email: val.email,
                phone: val.phone,
                provide: val.province,
                district: val.district,
                town: val.town
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

    vietnamese() {
        this.adapter.setLocale('vi');
    }

    onSubmit_info(){
        const token: string = this.appService.getCookie(tokenName);
        // console.log(this.form.value);
        this.profileManagementService.updateUserInfo(this.form.value, token).subscribe((res: IUsers) => {
            console.log(res);
        })
    }
}
