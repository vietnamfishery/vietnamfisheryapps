import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-growths',
  templateUrl: './add-growths.component.html',
  styleUrls: ['./add-growths.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class AddGrowthsComponent implements OnInit {

  public form: FormGroup;
  
  constructor(
    private adapter: DateAdapter<any>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      pondName: [null, Validators.compose([Validators.required])],
      seasonName: [null, Validators.compose([Validators.required])],
      averageDensity: [null, Validators.compose([Validators.required])],
      averageMass: [null, Validators.compose([Validators.required])],
      speedOdGrowth: [null, Validators.compose([Validators.required])],
      livingRatio: [null, Validators.compose([Validators.required])]
    });
  }

  vietnamese() {
    this.adapter.setLocale('vi');
  }

}
