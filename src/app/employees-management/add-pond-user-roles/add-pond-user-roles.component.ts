import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { EmployeesManagementService } from '../../employees-management/employees-management.service';
import { AppService } from '../../app.service';
import { tokenName } from '../../../environments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'add-pond-user-roles',
    templateUrl: './add-pond-user-roles.html',
})
export class AddPondUserRolesComponent implements OnInit {
    employeeArray: any[] = [];
    pondArray: any[] = [];
    token: string;
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddPondUserRolesComponent>,
        private appService: AppService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private employeesManagementService: EmployeesManagementService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.createForm();
        this.employeesManagementService.getAllPondAndEmployees(this.token).subscribe((res: any) => {
            this.employeeArray = res.user.employees;
            this.pondArray = res.user.ponds;
        })
    }

    createForm() {
        this.form = this.fb.group({
            pondId: [null, Validators.compose([Validators.required])],
            userId: [null, Validators.compose([Validators.required])],
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.form.invalid) {
            this.snackBar.open('Vui lòng cung cấp đủ thông tin, cảm ơn!', 'Đóng', {
                duration: 2500,
                horizontalPosition: "center",
                verticalPosition: 'top'
            })
        } else {
            this.employeesManagementService.addPondUserRole(this.form.value, this.token).subscribe((res: any) => {
                if(res.success) {
                    this.dialogRef.close();
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "right",
                    })
                } else {
                    this.form.reset();
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }
}