import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as jwtDecode from 'jwt-decode';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/environments';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StockingService } from '../stocking.service';
import { StorageManagementService } from 'src/app/storage-management/storage-management.service';

@Component({
    selector: 'app-edit-stocking',
    templateUrl: './edit-stocking.component.html',
    styleUrls: ['./edit-stocking.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ]
})
export class EditStockingComponent implements OnInit {

    public form: FormGroup;
    token: string;
    ownerId: number;
    stockingDetailUUId: string;
    stockingDetalis: any[] = [];
    breeds: any = []; // select cac con giong hien co trong kho

    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
        private storageManagementService: StorageManagementService,
        public snackBar: MatSnackBar,
        private stockingService: StockingService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.createForm();
        this.route.paramMap.pipe(
        switchMap(params => {
            this.stockingDetailUUId = params.get('stockingDetailUUId');
            return this.stockingService.getStockingDetailsByStockingDetailsUUId({
                stockingDetailUUId: this.stockingDetailUUId
            }, this.token);
        })).subscribe(res => {
            if (res.success) {
                this.stockingDetalis = res.stockingDetails;
                this.form.patchValue({
                    ...res.stockingDetails
                })
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            this.getBreed();
        });
    }

    createForm = () => {
        this.form = this.fb.group({
            stockingDetailUUId: [this.stockingDetailUUId],
            breedId: [null, Validators.compose([Validators.required])],
            stockingQuantity: [null, Validators.compose([Validators.required])],
            phFirst: [null, Validators.compose([Validators.required])],
            salinityFirst: [null, Validators.compose([Validators.required])],
            CreatedDate: [null, Validators.compose([Validators.required])]
        });
    }

    getBreed() {
        this.storageManagementService.getBreedWithUser(this.token).subscribe(res => {
            this.breeds = res.breeds ? res.breeds : [];
        });
    }

    checkForm(slt, pH, salty) {
        const reg = new RegExp(/^[0-9]+$/);
        if (!reg.test(slt) || !reg.test(pH) || !reg.test(salty)) {
            this.snackBar.open('Giá trị nhập phải là số và không âm, vui lòng kiểm tra lại!', 'Đóng', {
                duration: 2500,
                horizontalPosition: "center",
                verticalPosition: 'top'
            });
            return false;
        }
        return true;
    }

    onSubmit() {
        if (this.checkForm(this.form.controls.stockingQuantity.value, this.form.controls.phFirst.value, this.form.controls.salinityFirst.value)) { 
            this.stockingService.updateStockingDetailsByStockingDetailsUUId(this.form.value, this.token).subscribe(res => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                    this.router.navigate(['/quan-ly-tha-nuoi']);
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
}
