import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { unitStorages, unitBreed } from '../../constants/select-data';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Storages, Breed } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { remove } from 'lodash';

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
	type: number = 0;
	form: FormGroup;
	formBreed: FormGroup;
	arrFormStorage: any[] = [];
	arrFormBreed: any[] = [];
	arrFormStoragePosition: number = 0;
	arrFormBreedPosition: number = 0;
	unitStorages = unitStorages;
	unitPriceStorage: number = null;
	unitBreed = unitBreed;
	selectedType: string;
	selectedUnit: string;
	token: any;
	minDate = new Date(2000, 0, 1);
	maxDate = new Date(2020, 0, 1);

	storage: Storages[] = [];
	breed: Breed[] = [];
	filteredOptionStorages: Observable<Storages[]>;
	filteredOptionBreed: Observable<Breed[]>;
	constructor(
		private adapter: DateAdapter<any>,
		private route: ActivatedRoute,
		public snackBar: MatSnackBar,
		private router: Router,
		private fb: FormBuilder,
		private storageManagementService: StorageManagementService,
		private appService: AppService
	) {
        this.token = this.appService.getCookie(tokenName);
	}
    
	ngOnInit() {
        this.type = this.router.url.includes('thuc-an') ? 0 : this.router.url.includes('co-so-vat-chat') ? 1 : this.router.url.includes('thuoc-&-duoc-pham') ? 2 : 3;
		/**
		 * thuc-an = 0
		 * co-so-vat-chat = 1
		 * thuoc-&-duoc-pham = 2
		 * giong-nuoi = 3
		 */
		this.storageManagementService.getStorageWithUser(this.token, this.type).subscribe((res: any) => {
			this.storage = res.storages ? res.storages : [];
			this.storageManagementService.getBreedWithUser(this.token).subscribe((res: any) => {
			  this.breed = res.breeds ? res.breeds : [];
			})
		});
		/**********************/
		/*       STORAGE      */
		/**********************/
		this.arrFormStorage.push(this.createFormStorage());
		this.changeFilteredOptionStorage(0);
		/**********************/
		/*       BREEDS       */
		/**********************/
		this.arrFormBreed.push(this.createFormBreed());
		this.changeFilteredOptionBreed(0);
	}
	/**********************/
	/*         ALL        */
	/**********************/
	setType(type) {
		return type === 'thuc-an' ? 0 : type === 'co-so-vat-chat' ? 1 : type === 'thuoc-&-duoc-pham' ? 2 : 3;
	}

	vietnamese() {
		this.adapter.setLocale('vn');
	}

	private _filterStorage(name: string): Storages[] {
		const filterValue = name.toLowerCase();

		return this.storage ? this.storage.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0) : [];
	}

	private _filterBreed(name: string): Breed[] {
		const filterValue = name.toLowerCase();

		return this.breed ? this.breed.filter(option => option.breedName.toLowerCase().indexOf(filterValue) === 0) : [];
	}

	// checkType = () => {
	// 	console.log(this.type);
	// }

	clearValue() {
		this.form.reset();
		this.formBreed.reset();
	}

	goToLink = (type) => {
		this.type = this.setType(type);
		this.router.navigate(['/quan-ly-kho/nhap-kho', type]);
    }
    
    removeForm(f: any) {
        if(this.arrFormStorage.length > 1) {
            remove(this.arrFormStorage, e => e.position === f.position);
        }
    }

	/**********************/
	/*       STORAGE      */
	/**********************/
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

	displayFn(storage?: any): string | undefined {
		return storage ? storage.productName : undefined;
	}

	addFormStorage() {
		this.arrFormStoragePosition++;
		this.arrFormStorage.push(this.createFormStorage());
	}

	checkFormStorage(tvp, u, sl, gdv, ncc, dcncc) {
		const reg = new RegExp(/^[0-9]+$/);
		if(sl.includes('-') || gdv.includes('-')) {
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
					})
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

	/**********************/
	/*       BREEDS       */
	/**********************/
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

	changeFilteredOptionBreed(i: number) {
		this.filteredOptionBreed = this.arrFormBreed[i].form.controls.breedName.valueChanges
			.pipe(
				startWith<string | any>(''),
				map((value: any) => {
					return typeof value === 'string' ? value : value.breedName;
				}),
				map((name: any) => name ? this._filterBreed(name) : this.breed.slice())
			);
	}

	displayFnBreed(breed?: any): string | undefined {
		return breed ? breed.breedName : undefined;
	}

	addFormBreed() {
		this.arrFormBreedPosition++;
		this.arrFormBreed.push(this.createFormBreed());
	}

	checkFormBreed = (tenGiong, donViTinh, soLuong, giaDonVi, vongDoi, coQuanKiemDinh, diaChiMua) => {
		const reg = new RegExp(/^[0-9]+$/);
		if(soLuong.includes('-') || giaDonVi.includes('-') || vongDoi.includes('-')) {
			this.snackBar.open('Số lượng/giá/Vòng đời không được âm, vui lòng kiểm tra lại, cảm ơn!', 'Đóng', {
				duration: 2500,
				horizontalPosition: "center",
				verticalPosition: 'top'
			});
			return false;
		}
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

	onSubmitBreedAll = () => {
		const data: any = {
			boughtBreedId: this.boughtBreedId,
			itemArr: []
		};
		let ok = false; // check xem toàn bộ form có ok hết không
		for (let e of this.arrFormBreed) {
			if (this.checkFormBreed(e.form.controls.breedName.value, e.form.controls.unit.value, e.form.controls.quantity.value, e.form.controls.unitPrice.value, e.form.controls.loopOfBreed.value, e.form.controls.testingAgency.value, e.form.controls.soldAddress.value)) {
				if (e.form.valid) {
					e.form.value['position'] = e.position;
					data.itemArr.push(e.form.value),
					ok = true;
				}
			} else {
				break;
			}
		}
		if(ok) {
			this.storageManagementService.addBreed(this.token, data).subscribe(res => {
				if(res.success) {
					this.snackBar.open(res.message, 'Đóng', {
						duration: 2500,
						horizontalPosition: "right",
						verticalPosition: 'bottom'
					})
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
}
