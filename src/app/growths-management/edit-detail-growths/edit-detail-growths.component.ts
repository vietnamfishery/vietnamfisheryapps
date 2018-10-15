import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';

@Component({
  selector: 'app-edit-detail-growths',
  templateUrl: './edit-detail-growths.component.html',
  styleUrls: ['./edit-detail-growths.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class EditDetailGrowthsComponent implements OnInit {

  constructor(
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
  }

  vietnamese() {
    this.adapter.setLocale('vi');
  }
}
