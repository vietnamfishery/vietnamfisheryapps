import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from './pond-management.component';
import { AppService } from '../app.service';
import { PondManagementService } from './pond-management.service';
import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { tokenName } from '../constants/constant';

@Component({
    selector: 'dialog-add-roles',
    templateUrl: './dialog-add-roles.html',
})
export class DialogAddRole implements OnInit {
    public form: FormGroup;
    private token: string;
    employees: any[] = [];
    selected: any = {};
    
    constructor(
        public dialogRef: MatDialogRef<DialogAddRole>,
        private pondManagementService: PondManagementService,
        private employeesManagementService: EmployeesManagementService,
        public snackBar: MatSnackBar,
        private appService: AppService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.createForm();
        this.getEmp();
    }

    createForm = () => {
        this.form = this.fb.group({
            userId: [null, Validators.compose([Validators.required])],
            pondId: [(this.data as any).pondId]
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
                this.employees = res.employees
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.form.invalid) {
            this.snackBar.open('Hãy chọn người quản lý ao.', 'Đóng', {
                duration: 2500,
                horizontalPosition: "center",
                verticalPosition: 'top'
            })
        } else {
            const data: any = {
                userId: (this.form.value.userId as number),
                pondId: this.form.value.pondId
            }
            this.pondManagementService.addPondUserRole(this.form.value, this.token).subscribe((res: any) => {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right",
                })
            })
        }
    }
}