import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { PeriodicElement } from '../models/PeriodicElement';
import { ELEMENT_DATA } from '../contants/table-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-seasion-management',
  templateUrl: './seasion-management.component.html',
  styleUrls: ['./seasion-management.component.scss']
})
export class SeasionManagementComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  animal: string;
  name: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }


  openDialogAddSeasion(): void {
    const dialogRef = this.dialog.open(DialogAddSeasion, {
      width: '260px',
      data: { name: this.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

@Component({
  selector: 'dialog-add-seasion',
  templateUrl: './dialog-add-seasion.html',
})
export class DialogAddSeasion {
  // selected = 'option2';
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddSeasion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
    ) { }

    ngOnInit() {
      this.form = this.fb.group({
        seasionName: [null, Validators.compose([Validators.required])],
        pond: [null, Validators.compose([Validators.required])]
      });
    }
}