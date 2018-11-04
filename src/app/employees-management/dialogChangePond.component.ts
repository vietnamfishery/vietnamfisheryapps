import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DialogData } from '../pond-management/pond-management.component';
import { Router } from '@angular/router';
import { Users } from '../models/users';

import { EmployeesManagementService } from '../employees-management/employees-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'dialog-change-pond',
    templateUrl: './dialog-change-pond.html',
  })
  export class DialogChangePondComponent implements OnInit {
    token: any;
    name: string;
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
      public dialogRef: MatDialogRef<DialogChangePondComponent>,
      private appService: AppService,
      private fb: FormBuilder,
      public snackBar: MatSnackBar,
      private employeesManagementService: EmployeesManagementService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
      this.token = this.appService.getCookie(tokenName);
    }
  
      ngOnInit() {
        this.createForm();
        console.log((this.data as any));
        // this.employeesManagementService.getEmployeeById(this.token, (this.data as any).pondUserRolesId).subscribe((res: any) => {
        //   this.name = res.roles.users.lastname + ' ' + res.roles.users.firstname;
        //   this.form.patchValue({
        //     roles: res.roles.roles
        //   })
        // })
      }
  
      createForm() {
        this.form = this.fb.group({
            userId: [null, Validators.compose([Validators.required])],
            pondId: [null, Validators.compose([Validators.required])]
        })
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit() {
      this.employeesManagementService.updateRolesEmployee(this.token,{
        rolesId: (this.data as any).rolesId,
        roles: this.form.value.roles
      }).subscribe((res: any) => {
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