import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Storages } from 'src/app/models';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageManagementService } from '../../storage-management.service';
import { DateAdapter, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { startWith, map } from 'rxjs/operators';
import { remove, find } from 'lodash';
import { unitStorages } from 'src/app/constants/select-data';
import { tokenName } from 'src/app/constants/constant';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.scss']
})
export class AddMaterialsComponent implements OnInit {

    arrFormStorage: any[] = []
    filteredOptionStorages: Observable<Storages[]>;
	storage: Storages[] = [];
    type: number = 1;
    arrFormStoragePosition: number = 0;
    token: string;
    couponId: number;
    unitStorages: any = unitStorages;

    constructor(
		private fb: FormBuilder,
		private storageManagementService: StorageManagementService,
		private adapter: DateAdapter<any>,
        private router: Router,
		public snackBar: MatSnackBar,
		private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.getStorage();
        this.arrFormStorage.push(this.createFormStorage());
		this.changeFilteredOptionStorage(0);
    }

    getStorage() {
        this.storageManagementService.getStorageWithUser(this.token, this.type).subscribe((res: any) => {
			this.storage = res.storages ? res.storages : [];
		});
    }

    changeFilteredOptionStorage(i: number) {
		this.filteredOptionStorages = this.arrFormStorage[i].form.controls.product.valueChanges
			.pipe(
				startWith<string | any>(''),
				map((value: any) => {
					return typeof value === 'string' ? value : value.productName;
				}),
				map((name: any) => name ? this._filterStorage(name) : this.storage.slice())
			);
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

	private _filterStorage(name: string): Storages[] {
		const filterValue = name.toLowerCase();

		return this.storage ? this.storage.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0) : [];
    }
    
    removeForm(f: any) {
        if(this.arrFormStorage.length > 1) {
            this.arrFormStoragePosition--;
            remove(this.arrFormStorage, e => e.position === f.position);
        }
    }

    vietnamese() {
		this.adapter.setLocale('vn');
    }
    
    displayFn(storage?: any): string | undefined {
		return storage ? storage.productName : undefined;
    }
    
    addFormStorage() {
		this.arrFormStoragePosition++;
		this.arrFormStorage.push(this.createFormStorage());
    }
    
    checkFormStorage(tvp, u, sl, gdv, ncc, dcncc) {
		const reg = new RegExp(/^[0-9]+$/);
		if((sl || '').includes('-') || (gdv || '').includes('-')) {
			this.snackBar.open('Số lượng và giá không được âm, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
				duration: 2500,
				horizontalPosition: "center",
				verticalPosition: 'top'
			});
			return false;
		}
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

	onSubmitStorageAll = () => {
		const data: any = {
			couponId: this.couponId,
			itemArr: []
        };
        let ok = false; // check xem toàn bộ form có ok hết không
		for (let e of this.arrFormStorage) {
            if(e.form.invalid) {
                break;
            }
			if (this.checkFormStorage(e.form.controls.product.value, e.form.controls.unit.value, e.form.controls.quantity.value, e.form.controls.unitPrice.value, e.form.controls.provider.value, e.form.controls.providerAddress.value)) {
				if (e.form.valid) {
					e.form.value['position'] = e.position;
					data.itemArr.push(e.form.value);
					ok = true;
				}
			} else {
				break;
			}
		}
		if(ok) {
			this.storageManagementService.addStorage(this.token, data).subscribe((res) => {
				if(res.success) {
					this.snackBar.open(res.message, 'Đóng', {
						duration: 2500,
						horizontalPosition: "right",
						verticalPosition: 'bottom'
                    });
                    this.router.navigate(['/quan-ly-kho/co-so-vat-chat']);
				} else {
					this.snackBar.open(res.message, 'Đóng', {
						duration: 2500,
						horizontalPosition: "center",
						verticalPosition: "top",
					})
				}
			})
		}
    }
    
    setAutocomplete(storage: any, position: number) {
        let s: any = storage;
        if(!storage.storageId) {
            s = find(this.storage, (e => e.productName.toLowerCase() === storage.toLowerCase()))
        }
        if(s && s !== '') {
            this.arrFormStorage[position].form.patchValue({
                product: s,
                unit: s.unit
            });
            this.arrFormStorage[position].form.controls.unit.disable();
        } else {
            this.arrFormStorage[position].form.controls.unit.enable();
        }
    }
    goto(path: string) {
        this.router.navigate([path]);
    }
}
