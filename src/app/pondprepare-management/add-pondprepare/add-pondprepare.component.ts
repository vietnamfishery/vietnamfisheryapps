import { MY_FORMATS_DATE } from './../../constants/format-date';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ELEMENT_DATA } from 'src/environments';

@Component({
  selector: 'app-add-pondprepare',
  templateUrl: './add-pondprepare.component.html',
  styleUrls: ['./add-pondprepare.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class AddPondprepareComponent implements OnInit {

  public form: FormGroup;
  public formMaterial: FormGroup;
  isLinear = true;
  openedTab = 2;
  arrayMaterial = [1];
  itemName: any = {};
  quantity: any = {};
  dataSource = new MatTableDataSource<any>(this.arrayMaterial);
  displayedColumns: string[] = ['seasonName', 'quantity', 'action'];
  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private fb_material: FormBuilder,
    private pondprepareManagementService: PondprepareManagementService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      pondName: [null, Validators.compose([Validators.required])],
      seasonName: [null, Validators.compose([Validators.required])],
      pondprepareName: [null, Validators.compose([Validators.required])]
    });
    this.formMaterial = this.fb_material.group({
      itemName: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])]
    });
    this.onChangeForm();
  }

  onChangeForm = () => {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.isLinear = !this.isLinear;
      }
    });
  }

  addMaterial() {
    this.arrayMaterial.push(1);
    this.itemName.value = '';
    this.quantity.value = '';
  }

  openTab(e) {
    console.log(e);
  }

  onSubmit(itemName, quantity) {
    const reg = new RegExp(/^[^0-9]+$/);
    if (!itemName.value || !quantity.value) {
      this.snackBar.open('Bạn chưa nhập đủ thông tin, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    } else if (reg.test(quantity.value)) {
      this.snackBar.open('Số lượng phải nhập là số, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: 'top'
      });
    }
  }

  checkNumber(e) {
    const regNumber = new RegExp(/[^0-9]+$/);
    if (regNumber.test(e.target.value)) {
      e.preventDefault()
    }
  }
}
