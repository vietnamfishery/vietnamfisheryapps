import { Component, OnInit } from '@angular/core';
import { PondprepareManagementService } from './pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../constants/format-date';
import { tokenName } from '../../environments';
import { AppService } from '../app.service';
import * as moment from 'moment';
import { IMaterialPondprepare } from '../models/materialPondprepare';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079},
//   {position: 2, name: 'Helium', weight: 4.0026},
//   {position: 3, name: 'Lithium', weight: 6.941},
//   {position: 4, name: 'Beryllium', weight: 9.0122},
//   {position: 5, name: 'Boron', weight: 10.811}
// ];

@Component({
  selector: 'app-pondprepare-management',
  templateUrl: './pondprepare-management.component.html',
  styleUrls: ['./pondprepare-management.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})



export class PondprepareManagementComponent implements OnInit {
  displayedColumns: string[] = ['Material', 'quantity', 'price'];
  preloader = false;
  pondprepare: any[] = [];
  constructor(
    private pondprepareManagementService: PondprepareManagementService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.preloader = !this.preloader;
    const token: string = this.appService.getCookie(tokenName);
    this.pondprepareManagementService.getPondPrepareAll(token).subscribe((res) => {
      // console.log(res);
      if(res.success) {
        this.pondprepare = res.pondPrepare.map((element: any) => {
          return {
            pondprepareName: element.pondprepareName,
            pondprepareCreatedDate: moment(element.createdDate).format(`DD - MM - YYYY`),
            pondName: element.seasonAndPond.ponds.pondName,
            seasonName: element.seasonAndPond.seasons.seasonName,
            pondPrepareId: element.pondPrepareId,
            details: element.details
          }
        });
      } else {
        console.log('Lỗi get pondprepare');
      }
      this.preloader = !this.preloader;
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  panelOpenState = false;

}
