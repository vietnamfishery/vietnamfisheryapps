import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondManagementService } from './pond-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import { IPonds } from '../models/ponds';
import * as moment from 'moment';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-pond-management',
  templateUrl: './pond-management.component.html',
  styleUrls: ['./pond-management.component.scss']
})
export class PondManagementComponent implements OnInit {
  imageLink: string = '';
  pondCreatedDate: string;
  ponds: any[] = [];
  // num = 1;

  animal: string;
  name: string;
  imgSource: string = '';
  preloader: boolean = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private pondManagementService: PondManagementService,
    private appService: AppService
  ) {}

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  openDialogAddRole(): void {
    const dialogRef = this.dialog.open(DialogAddRole, {
      width: '260px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.preloader = !this.preloader;
    const token: string = this.appService.getCookie(tokenName);
    this.pondManagementService.getAllPond(token).subscribe((res: any) => {
      this.ponds = res.ponds.map((element: any) => {
        return {
          status: element.status,
          pondName: element.pondName,
          pondCreatedDate: moment(element.pondCreatedDate).format(`DD - MM - YYYY`),
          images: element.images,
          pondId: element.pondId
        }
      })
      this.preloader = !this.preloader;
  });
  }
}

// ///////////////////////////////////////////////////////

@Component({
  selector: 'dialog-add-roles',
  templateUrl: './dialog-add-roles.html',
})
export class DialogAddRole {
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogAddRole>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      user_roles: [null, Validators.compose([Validators.required])]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
