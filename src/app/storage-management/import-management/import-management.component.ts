import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { foods, unitStorages, unitBreed } from '../../constants/select-data';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IStorage, Breed } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-import-management',
  templateUrl: './import-management.component.html',
  styleUrls: ['./import-management.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class ImportManagementComponent implements OnInit {
  couponId: number = null; // Giữ phiếu nhập hiện tại - khởi đầu null - sử dụng cho trường hợp nhập sai 
  boughtBreedId: number = null; // Giữ phiếu nhập hiện tại - khởi đầu null - sử dụng cho trường hợp nhập sai 
  type: number;
  form: FormGroup;
  formBreed: FormGroup;
  arrFormStorage: any[] = [];
  arrFormBreed: any[] = [];
  arrFormStoragePosition: number = 0;
  arrFormBreedPosition: number = 0;
  // foods = foods;
  unitStorages = unitStorages;
  unitBreed = unitBreed;
  selectedType: string;
  selectedUnit: string;
  token: any;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  storage: IStorage[] = [];
  breed: Breed[] = [];
  filteredOptionStorages: Observable<IStorage[]>;
  filteredOptionBreed: Observable<Breed[]>;
  constructor(
    private adapter: DateAdapter<any>,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private storageManagementService: StorageManagementService,
    private appService: AppService
  ) { }

  vietnamese() {
    this.adapter.setLocale('vn');
  }

  ngOnInit() {
    this.type = this.setType((<any>this.route.snapshot.params).type)
    this.arrFormStorage.push(this.createFormStorage());
    this.arrFormBreed.push(this.createFormBreed());
    // this.form = this.createForm();
    /**
     * thuc-an = 0
     * co-so-vat-chat = 1
     * thuoc-va-duoc-pham = 2
     * giong-nuoi = 3
     */
    this.token = this.appService.getCookie(tokenName);
    this.storageManagementService.getStorageWithUser(this.token).subscribe((res: any) => {
      this.storage = res.storages;
      this.storageManagementService.getBreedWithUser(this.token).subscribe((res: any) => {
        this.breed = res.breeds;
      })
    });
    this.filteredOptionStorages = this.arrFormStorage[0].form.controls.product.valueChanges
      .pipe(
        startWith<string | any>(''),
        map((value: any) => {
          return typeof value === 'string' ? value : value.productName;
        }),
        map((name: any) => name ? this._filter(name) : this.storage.slice())
      );
      this.filteredOptionBreed = this.arrFormBreed[0].form.controls.breedName.valueChanges
        .pipe(
          startWith<string | any>(''),
          map((value: any) => {
            return typeof value === 'string' ? value : value.breedName;
          }),
          map((name: any) => name ? this._filter(name) : this.breed.slice())
        );
  }

  setType(type) {
    return type === 'thuc-an' ? 0 : type === 'co-so-vat-chat' ? 1 : type === 'thuoc-va-duoc-pham' ? 2 : 3;
  }

  createFormStorage = () => {
    return {
      form: this.fb.group({
        type: [this.type, Validators.compose([Validators.required])],
        product: [null, Validators.compose([Validators.required])],
        quantity: [null, Validators.compose([Validators.required])],
        unit: [null, Validators.compose([Validators.required])],
        unitPrice: [null, Validators.compose([Validators.required])],
        provider: [null, Validators.compose([Validators.required])],
        providerAddress: [null, Validators.compose([Validators.required])],
        descriptions: [null],
      }),
      position: this.arrFormStoragePosition,
    };
  }

  createFormBreed = () => {
    return {
      form: this.fb.group({
        breedName: [null, Validators.compose([Validators.required])],
        quantity: [null, Validators.compose([Validators.required])],
        unit: [null, Validators.compose([Validators.required])],
        unitPrice: [null, Validators.compose([Validators.required])],
        loopOfBreed: [null, Validators.compose([Validators.required])],
        testingAgency: [null, Validators.compose([Validators.required])],
        soldAddress: [null, Validators.compose([Validators.required])],
        descriptions: [null],
      }),
      position: this.arrFormBreedPosition,
    };
  }

  changeFilteredOptionStorage(i: number) {
    this.filteredOptionStorages = this.arrFormStorage[i].form.controls.product.valueChanges
      .pipe(
        startWith<string | any>(''),
        map((value: any) => {
          return typeof value === 'string' ? value : value.productName;
        }),
        map((name: any) => name ? this._filter(name) : this.storage.slice())
      );
  }

  changeFilteredOptionBreed(i: number) {
    this.filteredOptionBreed = this.arrFormBreed[i].form.controls.breedName.valueChanges
      .pipe(
        startWith<string | any>(''),
        map((value: any) => {
          return typeof value === 'string' ? value : value.breedName;
          console.log(value);
        }),
        map((name: any) => name ? this._filter(name) : this.breed.slice())
      );
  }

  displayFn(storage?: any): string | undefined {
    return storage ? storage.productName : undefined;
  }

  displayFnBreed(breed?: any): string | undefined {
    return breed ? breed.breedName : undefined;
  }

  private _filter(name: string): IStorage[] {
    const filterValue = name.toLowerCase();

    return this.storage.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  clearValue() {
    this.form.reset();
  }

  addFormStorage() {
    this.arrFormStoragePosition++;
    this.arrFormStorage.push(this.createFormStorage());
  }

  addFormBreed() {
    this.arrFormBreedPosition++;
    this.arrFormBreed.push(this.createFormBreed());
  }

  checkFormStorage(tvp, u, sl, gdv, ncc, dcncc) {
    const reg = new RegExp(/^[0-9]+$/);
    if (!reg.test(sl)) {
      this.snackBar.open('Số lượng phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else if (!reg.test(gdv)) {
      this.snackBar.open('Giá đơn vị phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else if (!tvp || u === null || u === '' || u === undefined || !sl || !gdv || !ncc || !dcncc) {
      this.snackBar.open('Không được để trống trường các trường bắt buộc.', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else {
      return true;
    }
  }

  onSubmit(tvp, u, sl, gdv, ncc, dcncc, mt?) {
    const reg = new RegExp(/^[0-9]+$/);
    if (!reg.test(sl)) {
      this.snackBar.open('Số lượng phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if (!reg.test(gdv)) {
      this.snackBar.open('Giá đơn vị phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if (!tvp || u === null || u === '' || u === undefined || !sl || !gdv || !ncc || !dcncc) {
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
      for (let e of this.arrFormStorage) {
        if (e.form.valid) {
          e.form.value['position'] = e.position;
          data.itemArr.push(e.form.value)
        }
      }
      this.storageManagementService.addStorage(this.token, data).subscribe((res) => {
        console.log(res);
      })
    }
  }

  onSubmitStorageAll = () => {
    const data: any = {
      couponId: this.couponId,
      itemArr: []
    };
    for (let e of this.arrFormStorage) {
      if (this.checkFormStorage(e.form.controls.product.value, e.form.controls.unit.value, e.form.controls.quantity.value, e.form.controls.unitPrice.value, e.form.controls.provider.value, e.form.controls.providerAddress.value)) {
        if (e.form.valid) {
          e.form.value['position'] = e.position;
          data.itemArr.push(e.form.value)
        }
      } else {
        break;
      }
    }
    // console.log(data);
    this.storageManagementService.addStorage(this.token, data).subscribe((res) => {
      console.log(res);
    })
  }

  goToLink = (type) => {
    this.type = this.setType(type);
    this.router.navigate(['/quan-ly-kho/nhap-kho', type]);
  }

  checkFormBreed = (tenGiong, donViTinh, soLuong, giaDonVi, vongDoi, coQuanKiemDinh, diaChiMua) => {
    const reg = new RegExp(/^[0-9]+$/);
    if (!reg.test(soLuong)) {
      this.snackBar.open('Số lượng phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else if (!reg.test(giaDonVi)) {
      this.snackBar.open('Giá đơn vị phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else if (!reg.test(vongDoi)) {
      this.snackBar.open('Vòng đời phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else if (!tenGiong || donViTinh === null || donViTinh === '' || donViTinh === undefined || !coQuanKiemDinh || !diaChiMua) {
      this.snackBar.open('Không được để trống trường các trường bắt buộc.', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
      return false;
    } else {
      return true;
    }
  }

  onSubmitBreed(tenGiong, donViTinh, soLuong, giaDonVi, vongDoi, coQuanKiemDinh, diaChiMua, moTa?) {
    const reg = new RegExp(/^[0-9]+$/);
    if (!reg.test(soLuong)) {
      this.snackBar.open('Số lượng phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if (!reg.test(giaDonVi)) {
      this.snackBar.open('Giá đơn vị phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if (!reg.test(vongDoi)) {
      this.snackBar.open('Vòng đời phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if (!tenGiong || donViTinh === null || donViTinh === '' || donViTinh === undefined || !coQuanKiemDinh || !diaChiMua) {
      this.snackBar.open('Không được để trống trường các trường bắt buộc.', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else {
      const data: any = {
        boughtBreedId: this.boughtBreedId,
        itemArr: []
      };
      for (let e of this.arrFormBreed) {
        if (e.form.valid) {
          e.form.value['position'] = e.position;
          data.itemArr.push(e.form.value)
        }
      }
      this.storageManagementService
    }
  }

  onSubmitBreedAll = () => {
    const data: any = {
      boughtBreedId: this.boughtBreedId,
      itemArr: []
    };
    for (let e of this.arrFormBreed) {
      if (this.checkFormBreed(e.form.controls.breedName.value, e.form.controls.unit.value, e.form.controls.quantity.value, e.form.controls.unitPrice.value, e.form.controls.loopOfBreed.value, e.form.controls.testingAgency.value, e.form.controls.soldAddress.value)) {
        if (e.form.valid) {
          e.form.value['position'] = e.position;
          data.itemArr.push(e.form.value)
        }
      } else {
        break;
      }
    }
    console.log(data)
  }
}
