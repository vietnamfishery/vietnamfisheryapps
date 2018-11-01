import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DialogData } from '../pond-management/pond-management.component';
import { Router } from '@angular/router';
import { Users } from '../models/users';

import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'dialog-add-role-management',
  templateUrl: './dialog-add-role-emp-management.html',
})
export class DialogAddRoleEmpManagement implements OnInit {
  token: any;
  name: string;
  public form: FormGroup;
  arrEmployee: any[] = [];
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
    public dialogRef: MatDialogRef<DialogAddRoleEmpManagement>,
    private appService: AppService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private employeesManagementService: EmployeesManagementService,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.token = this.appService.getCookie(tokenName);
  }

    ngOnInit() {
      this.createForm();
      this.employeesManagementService.getEmployee(this.token).subscribe((res: any) => {
        const arrayResult: any[] = [];
        for(let element of (res.employees as any[])){
          arrayResult.push({
            name: element.lastname + ' ' + element.firstname,
            userId: element.userId
          })
        }
        this.arrEmployee = arrayResult;
      })
    }

    createForm() {
      this.form = this.fb.group({
        userId: [null, Validators.compose([Validators.required])],
        roles: [null, Validators.compose([Validators.required])]
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.form.valid){
      this.employeesManagementService.addOnlyRolesEmployee(this.token, this.form.value).subscribe((res: any) => {
        if(res.success) {
          this.dialogRef.close();
          this.snackBar.open(res.message, 'Đóng', {
            duration: 2500,
            horizontalPosition: "right",
            verticalPosition: 'bottom'
          });
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

}
