import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DialogData } from '../pond-management/pond-management.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  rows = [];

  animal: string;
  name: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { 
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  openDialogAddRoleManagement(): void {
    const dialogRef = this.dialog.open(DialogAddRoleManagement, {
      width: '260px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-add-role-management',
  templateUrl: './dialog-add-role-management.html',
})
export class DialogAddRoleManagement {
  constructor(
    public dialogRef: MatDialogRef<DialogAddRoleManagement>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
