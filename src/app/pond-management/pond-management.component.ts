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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private pondManagementService: PondManagementService,
    private appService: AppService
  ) {
    // for (this.num; this.num <= 12; this.num += 1) {
    //   this.addProducts(this.num);
    // }
  }

  // thong tin pond
  // private ponds: IPonds = {
  //   pondId: null,
  //   pondUUId: '',
  //   userId: null,
  //   pondName: '',
  //   pondArea: null,
  //   pondDepth: null,
  //   createCost: null,
  //   status: null,
  //   images: '',
  //   pondLatitude: null,
  //   pondLongitude: null,
  //   createdBy:'',
  //   createdDate: new Date(),
  //   updatedBy: '',
  //   updatedDate: new Date(),
  //   isDeleted: null
  // };

  // addProducts(i) {
  //   this.ponds.push({
  //     id: i,
  //     price: (Math.random() * (0 - 10) + 10).toFixed(0),
  //     status: ['', '', '3', '0'][Math.floor(Math.random() * 4)],
  //     discount: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
  //     name: [
  //       'Ao số 1',
  //       'Ao số 2',
  //       'Ao số 3',
  //       'Ao số 4',
  //       'Ao số 5',
  //       'Ao số 6',
  //       'Ao số 7',
  //       'Ao số 8'][Math.floor(Math.random() * 8)]
  //   });
  // }

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
    const token: string = this.appService.getCookie(tokenName);
    // this.pondManagementService.test().subscribe(e => {
    //   console.log(e)
    // })
    this.pondManagementService.getAllPond(token).subscribe((res: any) => {
      this.ponds = res.ponds.map((element: any) => {
        return {
          status: element.status,
          pondName: element.pondName,
          pondCreatedDate: moment(element.pondCreatedDate).format(`DD - MM - YYYY`)
        }
      })
      this.imgSource = res.images;
      this.pondManagementService.loadImage(res.images).subscribe(data => {
        console.log(res);
        if (data) {
          this.imageLink = (data as any).data;
        }
      })
    });
  }
  getImage(): any {
    let styles = {
      'background-image': `url("${this.imageLink || "https://via.placeholder.com/360x360"}")`,
      'background-repeat': `no-repeat`,
      'background-size': `cover`,
      'background-position': 'center'
    };
    return styles;
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
