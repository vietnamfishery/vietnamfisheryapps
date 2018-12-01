import { Component, OnInit } from '@angular/core';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../constants/constant';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-editcost-pondprepare',
    templateUrl: './editcost-pondprepare.component.html',
    styleUrls: ['./editcost-pondprepare.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class EditcostPondprepareComponent implements OnInit {
    public form: FormGroup;
    incurredUUId: string;
    token: string;
    incurred: any = {}

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private appService: AppService,
        private snackBar: MatSnackBar,
        private router: Router,
        private pondprepareManagementService: PondprepareManagementService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.createForm();
        this.init();
    }

    init() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.incurredUUId = params.get('incurredUUId');
                return this.pondprepareManagementService.getIncurredByIncurredUUId({
                    incurredUUId: this.incurredUUId
                }, this.token);
            })).subscribe(res => {
                if (res.success) {
                    this.form.patchValue({
                        ...res.incurred
                    })
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
            });
    }

    createForm() {
        this.form = this.fb.group({
            incurredUUId: [this.incurredUUId],
            pondPrepareId: [null, Validators.compose([Validators.required])],
            incurredName: [null, Validators.compose([Validators.required])],
            value: [null, Validators.compose([Validators.required])],
            notes: [null]
        });
    }

    onSubmit() {
        this.pondprepareManagementService.updateIncurred(this.form.value, this.token).subscribe(res => {
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
