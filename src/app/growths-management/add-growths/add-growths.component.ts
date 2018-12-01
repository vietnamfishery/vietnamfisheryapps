import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import * as jwtDecode from 'jwt-decode';
import { GrowthsManagementService } from '../growths-management.service';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { tokenName } from '../../constants/constant';

@Component({
    selector: 'app-add-growths',
    templateUrl: './add-growths.component.html',
    styleUrls: ['./add-growths.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class AddGrowthsComponent implements OnInit {

    public form: FormGroup;
    pondUUId: string;
    token: string;
    ponds: any;
    ownerId: number;

    selected: any = {};
    
    constructor(
        private adapter: DateAdapter<any>,
        private appService: AppService,
        public snackBar: MatSnackBar,
        private growthsManagementService: GrowthsManagementService,
        private pondManagementService: PondManagementService,
        private fb: FormBuilder
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        const obj: any = {
            ownerId: this.ownerId,
            status: 1
        }
        this.pondManagementService.getAllPondWithPresentSeason(obj, this.token).subscribe(res => {
            this.ponds = res.ponds;
        })
        this.createForm();
    }
    
    createForm = () => {
        this.form = this.fb.group({
            ownerId: [this.ownerId],
            pondId: [null, Validators.compose([Validators.required])],
            averageDensity: [null, Validators.compose([Validators.required])],
            averageMass: [null, Validators.compose([Validators.required])],
            speedOdGrowth: [null, Validators.compose([Validators.required])],
            livingRatio: [null, Validators.compose([Validators.required])]
        });
    }

    vietnamese() {
        this.adapter.setLocale('vi');
    }

    onSubmit() {
        this.growthsManagementService.addGrowth(this.form.value, this.token).subscribe(res => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "right"
                });
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }
}
