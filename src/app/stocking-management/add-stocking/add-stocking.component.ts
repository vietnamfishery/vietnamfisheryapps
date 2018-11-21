import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/environments';
import * as jwtDecode from 'jwt-decode';
import { StorageManagementService } from 'src/app/storage-management/storage-management.service';
import { StockingService } from '../stocking.service';

@Component({
    selector: 'app-add-stocking',
    templateUrl: './add-stocking.component.html',
    styleUrls: ['./add-stocking.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ]
})
export class AddStockingComponent implements OnInit {

    public form: FormGroup;
    pondUUId: string;
    token: string;
    ownerId: number;
    pond: any;
    breeds: any = []; // select cac con giong hien co trong kho
    constructor(
        private route: ActivatedRoute,
        private pondManagementService: PondManagementService,
        private storageManagementService: StorageManagementService,
        public snackBar: MatSnackBar,
        private appService: AppService,
        private fb: FormBuilder,
        private stockingService: StockingService,
        private router: Router

    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.pondUUId = params.get('pondUUId');
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })).subscribe(res => {
                this.pond = res.pond
            });
        this.storageManagementService.getBreedWithUser(this.token).subscribe(res => {
            this.breeds = res.breeds ? res.breeds : [];
        });
        this.createForm();
    }

    createForm = () => {
        this.form = this.fb.group({
            pondId: [null],
            ownerId: [this.ownerId],
            breedId: [null, Validators.compose([Validators.required])],
            stockingQuantity: [null, Validators.compose([Validators.required])],
            phFirst: [null, Validators.compose([Validators.required])],
            salinityFirst: [null, Validators.compose([Validators.required])],
            createdDate: [null, Validators.compose([Validators.required])],
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
        this.form.patchValue({
            pondId: this.pond.pondId
        });

        if (this.checkForm(this.form.controls.stockingQuantity.value, this.form.controls.phFirst.value, this.form.controls.salinityFirst.value)) {
            this.stockingService.addStocking(this.form.value, this.token).subscribe(res => {
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
