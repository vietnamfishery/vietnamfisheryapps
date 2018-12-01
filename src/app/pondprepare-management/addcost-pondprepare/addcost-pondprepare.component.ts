import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../constants/constant';


@Component({
    selector: 'app-addcost-pondprepare',
    templateUrl: './addcost-pondprepare.component.html',
    styleUrls: ['./addcost-pondprepare.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class AddcostPondprepareComponent implements OnInit {

    public form: FormGroup;
    pondPrepareUUId: string;
    token: string;
    pondPrePare: any = {};

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        private pondprepareManagementService: PondprepareManagementService,
        private appService: AppService
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
                this.pondPrepareUUId = params.get('pondPrepareUUId');
                return this.pondprepareManagementService.getPondPrepareByPondPrePareUUId({
                    pondPrepareUUId: this.pondPrepareUUId
                }, this.token);
            })).subscribe(res => {
                if (res.success) {
                    this.pondPrePare = res.pondPrepare;
                    this.form.patchValue({
                        pondPrepareId: this.pondPrePare.pondPrepareId
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
            pondPrepareId: [null, Validators.compose([Validators.required])],
            incurredName: [null, Validators.compose([Validators.required])],
            value: [null, Validators.compose([Validators.required])],
            notes: [null]
        });
    }

    onSubmit() {
        this.pondprepareManagementService.addIncurred(this.form.value, this.token).subscribe(res => {
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
