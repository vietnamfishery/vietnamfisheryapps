import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../app.service';
import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { tokenName } from 'src/app/constants/constant';

@Component({
	selector: 'dialog-add-role-management',
	templateUrl: './dialog-add-role-management.html',
})
export class DialogAddRoleManagement implements OnInit {
	token: any;
	role: any = {
		userInfo: {
			firstname: '',
			lastname: ''
		},
	};
	public form: FormGroup;
	rolesList: any[] = [
		{
			value: 1,
			label: 'Quản lý ao nuôi'
		},
		{
			value: 2,
			label: 'Quản lý kho'
		}
	];
	constructor(
		public dialogRef: MatDialogRef<DialogAddRoleManagement>,
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
		this.loadData();
	}

	loadData = () => {
		this.employeesManagementService.getEmployeeById(this.token, (this.data as any).rolesId).subscribe((res: any) => {
			if (res.success) {
                console.log(res);
				this.role = res.roles;
			} else {
				this.snackBar.open(res.message, 'Đóng', {
					duration: 2500,
					horizontalPosition: "right",
					verticalPosition: 'bottom'
				});
			}
		})
	}

	createForm() {
		this.form = this.fb.group({
			roles: [null, Validators.compose([Validators.required])]
		})
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSubmit() {
		this.employeesManagementService.changeRoles({
			rolesId: this.role.rolesId,
			userId: this.role.userId,
			roles: this.form.value.roles,
			isDeleted: 0
		}, this.token).subscribe((res: any) => {
			if (res.success) {
				this.dialogRef.close();
				this.snackBar.open(res.message, 'Đóng', {
					duration: 2500,
					horizontalPosition: "right",
					verticalPosition: 'bottom'
				});
			} else {
				this.snackBar.open(res.message, 'Đóng', {
					duration: 2500,
					horizontalPosition: "center",
					verticalPosition: 'top'
				});
			}
		})
	}
}
