import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-stocking',
  templateUrl: './add-stocking.component.html',
  styleUrls: ['./add-stocking.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ]
})
export class AddStockingComponent implements OnInit {
  
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

  onSubmit() {
    console.log(this.form.value);
  }

}
