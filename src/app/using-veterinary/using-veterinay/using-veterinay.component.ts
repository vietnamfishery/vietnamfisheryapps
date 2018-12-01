import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { StorageManagementService } from 'src/app/storage-management/storage-management.service';
import { UsingVeterinaryService } from '../using-veterinary.service';
import * as jwtDecode from 'jwt-decode';
import { switchMap } from 'rxjs/operators';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from 'src/app/constants/format-date';
import { tokenName } from 'src/app/constants/constant';

@Component({
    selector: 'app-using-veterinay',
    templateUrl: './using-veterinay.component.html',
    styleUrls: ['./using-veterinay.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class UsingVeterinayComponent implements OnInit {

    token: string;
    ownerId: number;
    pondUUId: string;
    pond: any;
    form: FormGroup;
    storages: any;
    type: number = 2;

    constructor(
        private appService: AppService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private pondManagementService: PondManagementService,
        private storageManagementService: StorageManagementService,
        private usingVeterinaryService: UsingVeterinaryService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.createForm();
        this.init();
        this.getVeterinary();
    }

    createForm = () => {
        this.form = this.fb.group({
            pondId: [null],
            ownerId: [this.ownerId],
            takeCareName: [null, Validators.compose([Validators.required])],
            causesNSymptoms: [null, Validators.compose([Validators.required])],
            averageSize: [null, Validators.compose([Validators.required])],
            totalBiomass: [null, Validators.compose([Validators.required])],
            result: [null, Validators.compose([Validators.required])],
            latestHarvestDate: [null, Validators.compose([Validators.required])],
            mentor: [null, Validators.compose([Validators.required])],
            storageId: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
        });
    }

    init() {
        this.route.paramMap.pipe(
        switchMap(params => {
            this.pondUUId = params.get('pondUUId');
            return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
        })).subscribe(res => {
            if(res.success){
                this.pond = res.pond
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        });
    }

    getVeterinary = () => {
        this.storageManagementService.getStorageWithUser(this.token, this.type).subscribe(res => {
            if (res.success) {
                this.storages = res.storages;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        });
    }

    onSubmit() {
        this.form.patchValue({
            pondId: this.pond.pondId
        })
        this.usingVeterinaryService.addVeterinary(this.form.value, this.token).subscribe(res => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "right"
                });
                this.cancel();
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    cancel() {
        this.form.reset();
        this.router.navigate(['/su-dung-thuoc-&-duoc-pham'])
    }
}
