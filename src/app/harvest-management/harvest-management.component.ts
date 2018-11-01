import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HarvestManagementService } from './harvest-management.service';
import { tokenName } from '../../environments';
import * as moment from 'moment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-harvest-management',
  templateUrl: './harvest-management.component.html',
  styleUrls: ['./harvest-management.component.scss']
})
export class HarvestManagementComponent implements OnInit {

  preloader: boolean = false;
  harvest: any[] = [];
  harvests: any[] = [];
  num = 1;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private appService: AppService,
    private harvestManagementService: HarvestManagementService,
    public snackBar: MatSnackBar
  ) { 
    // for (this.num; this.num <= 2; this.num += 1) {
    //   this.addProducts(this.num);
    // }
  }

  // addProducts(i) {
  //   this.ponds.push({
  //     id: i,
  //     price: (Math.random() * (0 - 10) + 10).toFixed(0),
  //     status: ['', '', '', 'empty'][Math.floor(Math.random() * 4)],
  //     discount: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
  //     name: [
  //       'Thu hoạch đợt 1',
  //       'Thu hoạch đợt 2',
  //       'Thu hoạch đợt 3',
  //       'Thu hoạch đợt 4',
  //       'Thu hoạch đợt 5',
  //       'Thu hoạch đợt 6',
  //       'Thu hoạch đợt 7',
  //       'Thu hoạch đợt 8'][Math.floor(Math.random() * 8)]
  //   });
  // }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }
  
  ngOnInit() {
    this.preloader = !this.preloader;
    const token: string = this.appService.getCookie(tokenName);
    // this.harvestManagementService.getHarvestAll(token).subscribe((res) => {
    
    // });
  }

}


