import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { Storages } from 'src/app/models';

@Component({
	selector: 'app-foods-management',
	templateUrl: './foods-management.component.html',
	styleUrls: ['./foods-management.component.scss']
})
export class FoodsManagementComponent implements OnInit {
	type: string = 'thuc-an';
	ELEMENT_DATA: Storages[] = [];
	displayedColumns: string[] = ['name', 'quantity', 'unit', 'descriptions'];
	dataSource = new MatTableDataSource<Storages>(this.ELEMENT_DATA);
	token: string;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		public snackBar: MatSnackBar,
		private storageManagementService: StorageManagementService,
		private appService: AppService
	) {
		this.token = this.appService.getCookie(tokenName);
	}

	ngOnInit() {
		this.loadingData();
	}

	loadingData = () => {
		this.storageManagementService.getStorageWithUser(this.token, 0).subscribe((res: any) => {
			this.dataSource.data = res.storages ? res.storages : [];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
		})
	}
}
