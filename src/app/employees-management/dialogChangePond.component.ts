import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../pond-management/pond-management.component';

import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondManagementService } from '../pond-management/pond-management.service';
import { tokenName } from '../constants/constant';

@Component({
    selector: 'dialog-change-pond',
    templateUrl: './dialog-change-pond.html',
})
export class DialogChangePondComponent implements OnInit {
    token: any;
    name: string;
    public form: FormGroup;
    pondsList: any[] = [];
    constructor(
        public dialogRef: MatDialogRef<DialogChangePondComponent>,
        private appService: AppService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private employeesManagementService: EmployeesManagementService,
        private pondManagementService: PondManagementService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.createForm();
        this.getPond();
    }

    getPond() {
        this.pondManagementService.getPondWithUserNotManage({
            employeeId: this.data.userId
        }, this.token).subscribe((res: any) => {
            this.pondsList = res.ponds
            if(!res.ponds.length) {
                this.snackBar.open("Người này đang quản lý tất cả ao hiện có của bạn.", 'Đóng', {
                    duration: 4000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    createForm() {
        this.form = this.fb.group({
            pondId: [null, Validators.compose([Validators.required])]
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        const data: any = {
            pondUserRolesId: this.data.pondUserRolesId,
            pondId: this.form.value.pondId
        }
        this.employeesManagementService.updateRolesEmployee(this.token, data).subscribe((res: any) => {
            if (res.success) {
                this.dialogRef.close();
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right",
                    verticalPosition: 'bottom'
                });
            } else {
                this.dialogRef.close();
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

}