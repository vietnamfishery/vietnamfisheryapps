import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { foods } from '../../constants/select-data';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  public form_storage: FormGroup;
  foods = foods;
  selectedValue: string;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(
    private adapter: DateAdapter<any>,
    private fb_storage: FormBuilder
  ) { }

  vietnamese() {
    this.adapter.setLocale('vn');
  }

  ngOnInit() {
    // this.form_storage = this.fb_storage.group({
    //   couponType: [null, Validators.compose([Validators.required])],
    //   couponName: [null, Validators.compose([Validators.required])],
    //   unitType: [null, Validators.compose([Validators.required])],
    //   quantity: [null, Validators.compose([Validators.required])],
    //   totalCost: [null, Validators.compose([Validators.required])],
    //   lotNumber: [null, Validators.compose([])],
    //   dom: [null, Validators.compose([Validators.required])],
    //   ed: [null, Validators.compose([Validators.required])],
    //   provider: [null, Validators.compose([Validators.required])],
    //   note: [null, Validators.compose([])],
    // });
  }

}
