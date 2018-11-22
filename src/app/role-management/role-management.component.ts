import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DialogData } from '../pond-management/pond-management.component';
import { Router } from '@angular/router';
import { Users } from '../models/users';

import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogAddRoleEmpManagement } from './dialog-add-role-emp-management.component';
import { DialogAddRoleManagement } from './dialog-add-role-management.component';

@Component({
	selector: 'app-role-management',
	templateUrl: './role-management.component.html',
	styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
	ELEMENT_DATA: Users[]
	displayedColumns: string[] = ['name', 'roles', 'action'];
	dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);
	token: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	animal: string;
	name: string;
	constructor(
		private router: Router,
		private employeesManagementService: EmployeesManagementService,
		public snackBar: MatSnackBar,
		private appService: AppService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.token = this.appService.getCookie(tokenName);
		this.updateTable();
	}

	openDialogAddRoleManagement(rolesId): void {
		const dialogRef = this.dialog.open(DialogAddRoleManagement, {
			width: '280px',
			data: { rolesId }
		});

		dialogRef.afterClosed().subscribe(result => {
			this.updateTable()
		});
	}

	updateTable() {
		this.employeesManagementService.getEmployee(this.token).subscribe((res: any) => {
			const arrayResult: Users[] = [];
			for (let element of (res.employees as Users[])) {
				for (let role of element.roles) {
					arrayResult.push({
						userId: element.userId,
						firstname: element.firstname,
						lastname: element.lastname,
						role
					})
				}
			}
			this.ELEMENT_DATA = arrayResult;
			this.dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		})
	}

	openDialogAddRoleEmpManagement(): void {
		const dialogRef = this.dialog.open(DialogAddRoleEmpManagement, {
			width: '280px',
			// data: {rolesId}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.updateTable()
		});
	}

	deletedRole(userId, roles) {
		this.employeesManagementService.upsertUserRole({
			userId,
			roles,
			isDeleted: 1
		}, this.token).subscribe(res => {
			if (res.success) {
				this.snackBar.open('Đã xóa thành công.', 'Đóng', {
					duration: 2500,
					horizontalPosition: "right",
					verticalPosition: 'bottom'
				});
				this.updateTable()
			} else {
				this.snackBar.open(res.message, 'Đóng', {
					duration: 2500,
					horizontalPosition: "right",
					verticalPosition: 'bottom'
				});
			}
		})
	}
}
