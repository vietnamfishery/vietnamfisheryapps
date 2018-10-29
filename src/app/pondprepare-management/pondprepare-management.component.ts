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
  ELEMENT_DATA: IMaterialPondprepare[] = []
  displayedColumns: string[] = ['Nguyên vật liệu sử dụng', 'Số lượng', 'Chi phí'];
  dataSource = new MatTableDataSource<IMaterialPondprepare>(this.ELEMENT_DATA);

  ponds: any[] = [];
  pondprepare: any[] = [];
  pondprepareCreatedDate: string;
  num = 1;

  constructor(
    private pondprepareManagementService: PondprepareManagementService,
    private appService: AppService
  ) {
    // for (this.num; this.num <= 15; this.num += 1) {
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
  //       'Chuẩn bị đợt 1',
  //       'Chuẩn bị đợt 2',
  //       'Chuẩn bị đợt 3',
  //       'Chuẩn bị đợt 4',
  //       'Chuẩn bị đợt 5',
  //       'Chuẩn bị đợt 6',
  //       'Chuẩn bị đợt 7',
  //       'Chuẩn bị đợt 8'][Math.floor(Math.random() * 8)],

  //   });
  // }

  ngOnInit() {
    const token: string = this.appService.getCookie(tokenName);
    this.pondprepareManagementService.getPondPrepareAll(token).subscribe((res) => {
      if(res.success) {
        const a = res;
        this.pondprepare = res.pondPrepare.map((element: any) => {
          return {
            pondprepareName: element.pondprepareName,
            pondprepareCreatedDate: moment(element.createdDate).format(`DD - MM - YYYY`),
            pondName: element.seasonAndPond.ponds.pondName,
            seasonName: element.seasonAndPond.seasons.seasonName,
            pondPrepareId: element.pondPrepareId
          }
        });
        this.dataSource = res.pondPrepare;
        console.log(this.dataSource);        
      } else {
        console.log('Lỗi get pondprepare');
      }
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  panelOpenState = false;

}
