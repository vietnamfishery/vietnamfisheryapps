import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { EmployeesManagementService } from '../../employees-management/employees-management.service';
import { AppService } from '../../app.service';
import { tokenName } from '../../../environments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';

@Component({
    selector: 'add-pond-user-roles',
    templateUrl: './add-pond-user-roles.html',
})
export class AddPondUserRolesComponent implements OnInit {
    employeeArray: any[] = [];
    pondArray: any[] = [];
    token: string;
    employeeId: number;
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddPondUserRolesComponent>,
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
        this.getEmp()
        this.init();
    }
    
    init() {
        this.pondManagementService.getPondOfBoss(this.token).subscribe(res => {
            if(res.success) {
                this.pondArray = res.ponds
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                })
            }
        })
    }

    getEmp() {
        this.employeesManagementService.getUserManageWithPond(this.token).subscribe((res: any) => {
            if (res.success) {
                const arrayResult: any[] = [];
                if(res.employees.length === 0) {
                    return this.snackBar.open('Bạn chưa có tài khoản con nào. Chọn chức năng quản lý phân quyền để thêm tài khoản con.', 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.employeeArray = res.employees
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    getPond(employeeId: number) {
        this.pondManagementService.getPondWithUserNotManage({
            employeeId
        }, this.token).subscribe(res => {
            if(res.success) {
                if(!res.ponds.length) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                } else {
                    this.pondArray = res.ponds
                }
            }
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