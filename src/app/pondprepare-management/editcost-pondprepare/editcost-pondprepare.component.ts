import { Component, OnInit } from '@angular/core';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';

@Component({
  selector: 'app-editcost-pondprepare',
  templateUrl: './editcost-pondprepare.component.html',
  styleUrls: ['./editcost-pondprepare.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class EditcostPondprepareComponent implements OnInit {

  constructor(
    private pondprepareManagementService: PondprepareManagementService
  ) { }

  ngOnInit() {
  }

}
