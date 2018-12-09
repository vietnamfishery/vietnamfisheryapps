import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { GrowthsManagementService } from '../growths-management.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { tokenName } from '../../constants/constant';

@Component({
    selector: 'app-edit-detail-growths',
    templateUrl: './edit-detail-growths.component.html',
    styleUrls: ['./edit-detail-growths.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class EditDetailGrowthsComponent implements OnInit {

    public form: FormGroup;
    growth: any = {};
    growthUUId: any;
    token: string;

    constructor(
        private adapter: DateAdapter<any>,
        private fb: FormBuilder,
        private appService: AppService,
        private growthsManagementService: GrowthsManagementService,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private router: Router
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.form = this.fb.group({
            growthUUId: [this.growthUUId],
            averageDensity: [null, Validators.compose([Validators.required])],
            averageMass: [null, Validators.compose([Validators.required])],
            speedOdGrowth: [null, Validators.compose([Validators.required])],
            livingRatio: [null, Validators.compose([Validators.required])]
        });

        this.route.paramMap.pipe(
            switchMap(params => {
                this.growthUUId = params.get('growthUUId');
                return this.growthsManagementService.getGrowthByGrowthUUId({
                    growthUUId: this.growthUUId
                }, this.token);
            })
        ).subscribe(res => {
            if (res.success) {
                this.form.patchValue({
                    ...res.growth
                })
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    vietnamese() {
        this.adapter.setLocale('vi');
    }

    checkForm(mdtb, sltb, tdtt, tls) {
        const reg = new RegExp(/^\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/);
        if (!reg.test(mdtb) || !reg.test(sltb) || !reg.test(tdtt) || !reg.test(tls)) {
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
        if (this.checkForm(this.form.controls.averageDensity.value, this.form.controls.averageMass.value, this.form.controls.speedOdGrowth.value, this.form.controls.livingRatio.value)) {
            this.growthsManagementService.updateGrowth(this.form.value, this.token).subscribe((res) => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                    this.router.navigate(['/quan-ly-tang-truong']);
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "right"
                    });
                }
                this.form.reset();
            });
        }
    }
}
