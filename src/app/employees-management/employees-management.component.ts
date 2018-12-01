import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

import { EmployeesManagementService } from './employees-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../constants/constant';
import { Users } from '../models/users';
import { DialogChangePondComponent } from './dialogChangePond.component';
import { AddPondUserRolesComponent } from './add-pond-user-roles/add-pond-user-roles.component';

import { find } from 'lodash';

@Component({
    selector: 'app-employees-management',
    templateUrl: './employees-management.component.html',
    styleUrls: ['./employees-management.component.scss']
})
export class EmployeesManagementComponent implements OnInit {
    token: any;
    ELEMENT_DATA: Users[] = []

    displayedColumns: string[] = ['name', 'pond', 'action'];
    dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private employeesManagementService: EmployeesManagementService,
        public snackBar: MatSnackBar,
        private appService: AppService,
        public dialog: MatDialog
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.updateTable();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    updateTable = () => {
        this.employeesManagementService.getUserManageWithPond(this.token).subscribe((res: any) => {
            if (res.success) {
                const arrayResult: any[] = [];
                if(res.employees.length === 1 && res.employees[0].userInfo.pondUserRole.length === 0) {
                    return this.snackBar.open('Chưa có người dùng nào có quyền quản lý ao.', 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                for (let element of (res.employees as any[])) {
                    for (let pond of (element as any).userInfo.pondUserRole) {
                        arrayResult.push({
                            firstname: element.userInfo.firstname,
                            lastname: element.userInfo.lastname,
                            userId: element.userInfo.userId,
                            userUUId: element.userInfo.userUUId,
                            pond,
                        })
                    }
                }
                this.ELEMENT_DATA = arrayResult;
                this.dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right",
                    verticalPosition: 'bottom'
                });
                this.ELEMENT_DATA = [];
                this.dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        })
    }

    changePondDialog(pondUserRolesId: any, userId: any) {
        const dialogRef = this.dialog.open(DialogChangePondComponent, {
            width: '280px',
            data: { pondUserRolesId, userId }
        });
        dialogRef.afterClosed().subscribe(result => {
            // console.log(result);
            this.updateTable();
        });
    }

    addPondRolesDialog() {
        const dialogRef = this.dialog.open(AddPondUserRolesComponent, {
            width: '280px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.updateTable();
        });
    }

    deleteRoles = (pondUserRolesId) => {
        this.employeesManagementService.delPondUserRole({ pondUserRolesId }, this.token).subscribe((res: any) => {
            if (res.success) {
                this.updateTable();
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
