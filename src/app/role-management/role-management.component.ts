import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DialogData } from '../pond-management/pond-management.component';
import { Router } from '@angular/router';

import { PeriodicElement } from '../models/PeriodicElement';
import { ELEMENT_DATA } from '../constants/table-data';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  animal: string;
  name: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}


  openDialogAddRoleManagement(): void {
    const dialogRef = this.dialog.open(DialogAddRoleManagement, {
      width: '280px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}



@Component({
  selector: 'dialog-add-role-management',
  templateUrl: './dialog-add-role-management.html',
})
export class DialogAddRoleManagement {

  pondList: string[] = ['Ao nuôi 1', 'Ao nuôi 2', 'Ao nuôi 3', 'Ao nuôi 4', 'Ao nuôi 5', 'Ao nuôi 6', 'Ao nuôi 7', 'Ao nuôi 8'];
  constructor(
    public dialogRef: MatDialogRef<DialogAddRoleManagement>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
