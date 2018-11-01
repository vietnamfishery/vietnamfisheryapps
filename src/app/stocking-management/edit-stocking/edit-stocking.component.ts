import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';

@Component({
  selector: 'app-edit-stocking',
  templateUrl: './edit-stocking.component.html',
  styleUrls: ['./edit-stocking.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ]
})
export class EditStockingComponent implements OnInit {

  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      pondName: [null, Validators.compose([Validators.required])],
      seasonName: [null, Validators.compose([Validators.required])],
      stockingQuantity: [null, Validators.compose([Validators.required])],
      costOfStocking: [null, Validators.compose([Validators.required])],
      phFirst: [null, Validators.compose([Validators.required])],
      salinityFIRST: [null, Validators.compose([Validators.required])],
      createdDate: [null, Validators.compose([Validators.required])],
      breedType: [null, Validators.compose([Validators.required])]
    });
  }

}
