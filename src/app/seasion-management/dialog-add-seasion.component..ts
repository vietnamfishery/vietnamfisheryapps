import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../constants/format-date';
import { SeasionManagementService } from './seasion-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../constants/constant';

@Component({
    selector: 'dialog-add-seasion',
    templateUrl: './dialog-add-seasion.html',
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class DialogAddSeasion implements OnInit {
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DialogAddSeasion>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private appService: AppService,
        private seasionManagementService: SeasionManagementService,
        private router: Router,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            seasonName: [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit() {
        const token: string = this.appService.getCookie(tokenName);
        this.seasionManagementService.addseason(this.form.value, token).subscribe((res) => {
            if (res.success) {
                this.dialogRef.close();
                this.router.navigate(['/quan-ly-vu-nuoi']);
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            }
        });
    }
}