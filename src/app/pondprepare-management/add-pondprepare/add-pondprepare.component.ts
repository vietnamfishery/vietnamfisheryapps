import { MY_FORMATS_DATE } from './../../constants/format-date';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as jwtDecode from 'jwt-decode';
import { StorageManagementService } from 'src/app/storage-management/storage-management.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { tokenName } from 'src/app/constants/constant';

@Component({
    selector: 'app-add-pondprepare',
    templateUrl: './add-pondprepare.component.html',
    styleUrls: ['./add-pondprepare.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class AddPondprepareComponent implements OnInit {

    public form: FormGroup;
    public formPondPrepare: FormGroup;
    public formDetailPrepare: FormGroup;
    public detailsOfPrepare: any[] = [];
    public showDetailsOfPrepare: any[] = [];
    isLinear = true;
    token: string;
    ownerId: number;
    type: number = 1;
    storages: any[] = [];
    selected: any = {};

    constructor(
        private appService: AppService,
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private pondprepareManagementService: PondprepareManagementService,
        private storageManagementService: StorageManagementService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.getStorage();
        this.createFormPond();
        this.createFormPondPrepareName();
        this.createFormDetailPrepare();
    }

    getStorage() {
        this.storageManagementService.getStorageWithUser(this.token, this.type).subscribe(res => {
            if(res.success){
                this.storages = res.storages;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        });
    }

    createFormPond = () => {
        this.form = this.fb.group({
            pondName: [null, Validators.compose([Validators.required])],
            pondArea: [null, Validators.compose([Validators.required])],
            pondDepth: [null, Validators.compose([Validators.required])],
            status: [null, Validators.compose([Validators.required])],
            createCost: [null, Validators.compose([Validators.required])]
        });
    }
    
    createFormPondPrepareName = () => {
        this.formPondPrepare = this.fb.group({
            pondPrepareName: [null, Validators.compose([Validators.required])]
        });
    }

    createFormDetailPrepare = () => {
        this.formDetailPrepare = this.fb.group({
            storage: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
        });
    }

    addArray() {
        const obj: object = {
            storageId: this.formDetailPrepare.value.storage.storageId,
            quantity: this.formDetailPrepare.value.quantity
        }
        this.detailsOfPrepare.push(obj);
        this.showDetail();
    }

    showDetail() {
        const obj: object = {
            productName: this.formDetailPrepare.value.storage.productName,
            quantity: this.formDetailPrepare.value.quantity
        }
        this.showDetailsOfPrepare.push(obj);
    }

    reChoose() {
        this.detailsOfPrepare = [];
        this.showDetailsOfPrepare = [];
    }

    onSubmit() {
        const obj: object = {
            ...this.form.value,
            ...this.formPondPrepare.value,
            detailsOfPrepare: this.detailsOfPrepare,
            ownerId: this.ownerId
        }
        this.pondprepareManagementService.addNewPrepare(this.token, obj).subscribe(res => {
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
        this.router.navigate(['/quan-ly-chuan-bi-ao'])
    }
}
