import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { foods, units } from '../../constants/select-data';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IStorage } from 'src/app/models';

// export interface User {
//   name: string;
// }

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
	form: FormGroup;
  foods = foods;
  units = units;
  selectedType: string;
  selectedUnit: string;
  token: any;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  storage: IStorage[];
  filteredOptions: Observable<IStorage[]>;
  constructor(
    private adapter: DateAdapter<any>,
    private fb: FormBuilder,
    private storageManagementService: StorageManagementService,
    private appService: AppService
  ) { }

  vietnamese() {
    this.adapter.setLocale('vn');
  }

  ngOnInit() {
    this.token = this.appService.getCookie(tokenName);
    this.createForm();
    this.storageManagementService.getStorageWithUser(this.token).subscribe((res: any) => {
      this.storage = res.storage;
      this.filteredOptions = this.form.controls.productName.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => {
            return typeof value === 'string' ? value : value.productName;
          }),
          map(name => name ? this._filter(name) : this.storage.slice())
        );
    });
  }

  createForm() {
    this.form = this.fb.group({
      type: [null,  Validators.compose([Validators.required])],
      productName: [null,  Validators.compose([Validators.required])],
      quantity: [null,  Validators.compose([Validators.required])],
      unit: [null,  Validators.compose([Validators.required])],
      unitPrice: [null,  Validators.compose([Validators.required])],
      provider: [null,  Validators.compose([Validators.required])],
      providerAddress: [null,  Validators.compose([Validators.required])],
      descriptions: [null,  Validators.compose([Validators.required])],
    });
  }
  
  displayFn(storage?: any): string | undefined {
    console.log(storage);
    return storage ? storage.productName : undefined;
  }

  private _filter(name: string): IStorage[] {
    const filterValue = name.toLowerCase();

    return this.storage.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(){
    console.log(this.form.value);
  }
}
