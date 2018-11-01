import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../../constants/format-date';


@Component({
  selector: 'app-addcost-pondprepare',
  templateUrl: './addcost-pondprepare.component.html',
  styleUrls: ['./addcost-pondprepare.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class AddcostPondprepareComponent implements OnInit {

  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private pondprepareManagementService: PondprepareManagementService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      label: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])],
      responsible: [null, Validators.compose([Validators.required])]
    });
  }

}
