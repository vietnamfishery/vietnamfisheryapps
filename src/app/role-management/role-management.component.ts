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
  ) {}

  ngOnInit() {
    this.token = this.appService.getCookie(tokenName);
    this.employeesManagementService.getEmployee(this.token).subscribe((res: any) => {
      const arrayResult: Users[] = [];
      for(let element of (res.employees as Users[])){
        for(let role of element.roles){
          arrayResult.push({
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

  openDialogAddRoleManagement(rolesId): void {
    const dialogRef = this.dialog.open(DialogAddRoleManagement, {
      width: '280px',
      data: {rolesId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employeesManagementService.getEmployee(this.token).subscribe((res: any) => {
        const arrayResult: Users[] = [];
        for(let element of (res.employees as Users[])){
          for(let role of element.roles){
            arrayResult.push({
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
    });
  }

  updateTable(){
    this.employeesManagementService.getEmployee(this.token).subscribe((res: any) => {
      const arrayResult: Users[] = [];
      for(let element of (res.employees as Users[])){
        for(let role of element.roles){
          arrayResult.push({
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
      console.log('The dialog was closed');
      this.employeesManagementService.getEmployee(this.token).subscribe((res: any) => {
        const arrayResult: Users[] = [];
        for(let element of (res.employees as Users[])){
          for(let role of element.roles){
            arrayResult.push({
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
    });
  }

  deletedRole(rolesId) {
    this.employeesManagementService.updateRolesEmployee(this.token, {
      rolesId,
      isDeleted: 1
    }).subscribe(res => {
      if(res.success) {
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



@Component({
  selector: 'dialog-add-role-management',
  templateUrl: './dialog-add-role-management.html',
})
export class DialogAddRoleManagement implements OnInit {
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
    public dialogRef: MatDialogRef<DialogAddRoleManagement>,
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
      this.employeesManagementService.getEmployeeById(this.token, (this.data as any).rolesId).subscribe((res: any) => {
        this.name = res.roles.users.lastname + ' ' + res.roles.users.firstname;
        this.form.patchValue({
          roles: res.roles.roles
        })
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
