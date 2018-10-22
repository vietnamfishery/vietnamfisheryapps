import { MY_FORMATS_DATE } from './../../constants/format-date';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-add-pondprepare',
  templateUrl: './add-pondprepare.component.html',
  styleUrls: ['./add-pondprepare.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class AddPondprepareComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pondprepareManagementService: PondprepareManagementService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      pondName: [null, Validators.compose([Validators.required])],
      seasonName: [null, Validators.compose([Validators.required])],
      pondprepareName: [null, Validators.compose([Validators.required])],
      materialName: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      createdDate: [null, Validators.compose([Validators.required])],
    });
  }

}
