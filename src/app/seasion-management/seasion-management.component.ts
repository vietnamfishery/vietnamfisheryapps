import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { PeriodicElement } from '../models/PeriodicElement';
import { ELEMENT_DATA } from '../constants/table-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../constants/format-date';
import { SeasionManagementService } from './seasion-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-seasion-management',
  templateUrl: './seasion-management.component.html',
  styleUrls: ['./seasion-management.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class SeasionManagementComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // animal: string;
  name: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private adapter: DateAdapter<any>,
    private seasionManagementService: SeasionManagementService
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



// ////////////////////////////////////////////////////////////////////////


@Component({
  selector: 'dialog-add-seasion',
  templateUrl: './dialog-add-seasion.html',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class DialogAddSeasion {
  // selected = 'option2';
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddSeasion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private appService: AppService,
    private seasionManagementService: SeasionManagementService

    ) { }

    ngOnInit() {
      this.form = this.fb.group({
        seasonName: [null, Validators.compose([Validators.required])],
        pondName: [null, Validators.compose([Validators.required])],
        createdDate: [null, Validators.compose([Validators.required])],
      });

      const token: string = this.appService.getCookie(tokenName);
      this.seasionManagementService.getSeason(token).subscribe((res: any) => {
        if(res){
          console.log(res);
        }
      });
    }

    onSubmit(){
      const token: string = this.appService.getCookie(tokenName);
      console.log(this.form.value);

      // this.seasionManagementService.addseason(this.form.value, token).subscribe((res) => {

      // });
    }
}