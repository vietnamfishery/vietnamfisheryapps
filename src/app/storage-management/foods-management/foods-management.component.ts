import { Component, OnInit, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import { Storages } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-foods-management',
	templateUrl: './foods-management.component.html',
	styleUrls: ['./foods-management.component.scss']
})
export class FoodsManagementComponent implements OnInit {
    type: string = 'thuc-an';
    public form: FormGroup;
    productName: string;
    isEdit = false;
    checked = false;
    disabled = false;
    name: string;
	ELEMENT_DATA: Storages[] = [];
	displayedColumns: string[] = ['name', 'quantity', 'unit', 'descriptions'];
	dataSource = new MatTableDataSource<Storages>(this.ELEMENT_DATA);
	token: string;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
    @ContentChild('ssname') span: ElementRef;
	constructor(
		public snackBar: MatSnackBar,
		private storageManagementService: StorageManagementService,
        private appService: AppService,
        private fb: FormBuilder
	) {
		this.token = this.appService.getCookie(tokenName);
	}

	ngOnInit() {
        this.creatForm();
		this.loadingData();
	}

	loadingData = () => {
		this.storageManagementService.getStorageWithUser(this.token, 0).subscribe((res: any) => {
			if(res.success) {
                this.dataSource.data = res.storages ? res.storages : [];
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
		})
    }

    onSubmit(storageId, productName) {
        const data = { storageId, productName: productName.value }
        const token: string = this.appService.getCookie(tokenName);
        this.storageManagementService.updateFood(data, token).subscribe((res) => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            }
        })
        console.log(this.form.value)
    }

    creatForm = () => {
        this.form = this.fb.group({
            storageId: [null],
            productName: [null, Validators.compose([Validators.required])]
        });
    }

    cancel(span, form) {
        span.classList.remove('hidden');
        form.classList.add('hidden');
    }

    toEdit(span, form, productName) {
        this.productName = productName.value;
        span.classList.add('hidden');
        form.classList.remove('hidden');
    }
}
