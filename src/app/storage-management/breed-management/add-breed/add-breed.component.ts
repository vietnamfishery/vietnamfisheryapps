import { Component, OnInit } from '@angular/core';
import { StorageManagementService } from '../../storage-management.service';
import { AppService } from 'src/app/app.service';
import { Breed } from 'src/app/models';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { find } from 'lodash';
import { unitBreed } from 'src/app/constants/select-data';
import { tokenName } from 'src/app/constants/constant';

@Component({
	selector: 'app-add-breed',
	templateUrl: './add-breed.component.html',
	styleUrls: ['./add-breed.component.scss']
})
export class AddBreedComponent implements OnInit {

	token: string;
	breeds: Breed[] = [];
	arrFormBreed: any[] = [];
	arrFormBreedPosition: number = 0;
    filteredOptionBreed: Observable<Breed[]>;
    couponId: number;
	unitBreed = unitBreed;

	constructor(
		private storageManagementService: StorageManagementService,
        private router: Router,
		public snackBar: MatSnackBar,
		private fb: FormBuilder,
		private appService: AppService
	) {
		this.token = this.appService.getCookie(tokenName);

	}

	ngOnInit() {
		this.storageManagementService.getBreedWithUser(this.token).subscribe((res: any) => {
			this.breeds = res.breeds ? res.breeds : [];
        });
        this.arrFormBreed.push(this.createFormBreed());
		this.changeFilteredOptionBreed(0);
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

	changeFilteredOptionBreed(i: number) {
		this.filteredOptionBreed = this.arrFormBreed[i].form.controls.breedName.valueChanges
			.pipe(
				startWith<string | any>(''),
				map((value: any) => {
					return typeof value === 'string' ? value : value.breedName;
				}),
				map((name: any) => name ? this._filterBreed(name) : this.breeds.slice())
			);
	}

	private _filterBreed(name: string): Breed[] {
		const filterValue = name.toLowerCase();

		return this.breeds ? this.breeds.filter(option => option.breedName.toLowerCase().indexOf(filterValue) === 0) : [];
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
			couponId: this.couponId,
			itemArr: []
		};
		let ok = false; // check xem toàn bộ form có ok hết không
		for (let e of this.arrFormBreed) {
			if (this.checkFormBreed(e.form.controls.breedName.value, e.form.controls.unit.value, e.form.controls.quantity.value, e.form.controls.unitPrice.value, e.form.controls.loopOfBreed.value, e.form.controls.testingAgency.value, e.form.controls.soldAddress.value)) {
				if (e.form.valid) {
                    console.log(e);
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
                    this.router.navigate(['/quan-ly-kho/giong-nuoi'])
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
    
    setAutocomplete(breed: any, position: number) {
        let brd: any = breed;
        if(!breed.breedId) {
            brd = find(this.breeds, (e => e.breedName.toLowerCase() === breed.toLowerCase()))
        }
        if(brd && brd !== '') {
            this.arrFormBreed[position].form.patchValue({
                breedName: brd,
                unit: brd.unit
            });
            this.arrFormBreed[position].form.controls.unit.disable();
        } else {
            this.arrFormBreed[position].form.controls.unit.enable();
        }
    }

    back() {
        this.router.navigate(['/quan-ly-kho/giong-nuoi'])
    }
}
