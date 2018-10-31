import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
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
import { ActivatedRoute } from '@angular/router';

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
  couponId: number = null; // Giữ phiếu nhập hiện tại - khởi đầu null - sử dụng cho trường hợp nhập sai 
  type: number;
  form: FormGroup;
  formBreed: FormGroup;
  arrFormStorage: any[] = [];
  arrFormStoragePosition: number = 0;
  foods = foods;
  units = units;
  selectedType: string;
  selectedUnit: string;
  token: any;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  storage: IStorage[] = [
    {
      descriptions: 'Vôi sống',
      productName: 'Vôi sống',
      quantityStorages: 200,
      unit: 0
    },
    {
      descriptions: 'Thức ăn Biotic',
      productName: 'Thức ăn Biotic',
      quantityStorages: 150,
      unit: 0
    },
    {
      descriptions: 'Thuốc diệt rong',
      productName: 'Thuốc diệt rong',
      quantityStorages: 30,
      unit: 1
    },
    {
      descriptions: 'Thuốc kháng sinh',
      productName: 'Thuốc kháng sinh',
      quantityStorages: 150,
      unit: 1
    },
  ];
  filteredOptions: Observable<IStorage[]>;
  constructor(
    private adapter: DateAdapter<any>,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private storageManagementService: StorageManagementService,
    private appService: AppService
  ) { }

  vietnamese() {
    this.adapter.setLocale('vn');
  }

  ngOnInit() {
    this.type = (<any>this.route.snapshot.params).type === 'thuc-an' ? 0 : (<any>this.route.snapshot.params).type === 'co-so-vat-chat' ? 1 : (<any>this.route.snapshot.params).type === 'thuoc-va-duoc-pham' ? 2 : 3;
    this.arrFormStorage.push(this.createForm());
    // this.form = this.createForm();
    /**
     * thuc-an = 0
     * co-so-vat-chat = 1
     * thuoc-va-duoc-pham = 2
     * giong-nuoi = 3
     */
    this.token = this.appService.getCookie(tokenName);
    this.storageManagementService.getStorageWithUser(this.token).subscribe((res: any) => {
      // this.storage = res.storage;
    });
    this.filteredOptions = this.arrFormStorage[0].form.controls.product.valueChanges
      .pipe(
        startWith<string | any>(''),
        map((value: any) => {
          return typeof value === 'string' ? value : value.productName;
        }),
        map((name: any) => name ? this._filter(name) : this.storage.slice())
      );
    
  }

  createForm = () => {
    return {
      form: this.fb.group({
        type: [this.type,  Validators.compose([Validators.required])],
        product: [null,  Validators.compose([Validators.required])],
        quantity: [null,  Validators.compose([Validators.required])],
        unit: [null,  Validators.compose([Validators.required])],
        unitPrice: [null,  Validators.compose([Validators.required])],
        provider: [null,  Validators.compose([Validators.required])],
        providerAddress: [null, Validators.compose([Validators.required])],
        descriptions: [null],
      }),
      position: this.arrFormStoragePosition,
    };
  }

  changeFilteredOptions(i: number) {
    this.filteredOptions = this.arrFormStorage[i].form.controls.product.valueChanges
        .pipe(
          startWith<string | any>(''),
          map((value: any) => {
            return typeof value === 'string' ? value : value.productName;
          }),
          map((name: any) => name ? this._filter(name) : this.storage.slice())
        );
  }
  
  displayFn(storage?: any): string | undefined {
    return storage ? storage.productName : undefined;
  }

  private _filter(name: string): IStorage[] {
    const filterValue = name.toLowerCase();

    return this.storage.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  clearValue() {
    this.form.reset();
  }

  addForm() {
    this.arrFormStoragePosition++;
    this.arrFormStorage.push(this.createForm());
  }

  onSubmit(tvp, u, sl, gdv, ncc, dcncc, mt){
    const reg = new RegExp(/^[^0-9]+$/);
    if(reg.test(sl)) {
      this.snackBar.open('Số lượng phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if(reg.test(gdv)) {
      this.snackBar.open('Giá đơn vị phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if(!tvp || u === null || u === '' || u === undefined || !sl || !gdv || !ncc || !dcncc) {
      this.snackBar.open('Không được để trống trường các trường bắt buộc.', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else {
      const data: any = {
        couponId: this.couponId,
        itemArr: []
      };
      for(let e of this.arrFormStorage){
        if(e.form.valid) {
          e.form.value['position'] = e.position;
          data.itemArr.push(e.form.value)
        }
      }
      console.log(data);
      // this.storageManagementService.addStorage(this.token, data).subscribe((res) => {
      //   console.log(res);
      // })
    }
  }
}
