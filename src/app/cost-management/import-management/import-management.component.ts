import { Component, OnInit } from '@angular/core';
import { foods } from '../../contants/select-data';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../contants/format-date';

@Component({
  selector: 'app-import-management',
  templateUrl: './import-management.component.html',
  styleUrls: ['./import-management.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class ImportManagementComponent implements OnInit {
  foods = foods;
  selectedValue: string;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  constructor(private adapter: DateAdapter<any>) { }


  vietnamese() {
    this.adapter.setLocale('vi');
  }

  ngOnInit() {
  }

}
