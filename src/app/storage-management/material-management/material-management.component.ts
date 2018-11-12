import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Storages } from 'src/app/models';
import { tokenName } from 'src/environments';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-material-management',
    templateUrl: './material-management.component.html',
    styleUrls: ['./material-management.component.scss']
})
export class MaterialManagementComponent implements OnInit {
    type: string = 'co-so-vat-chat';
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
		this.storageManagementService.getStorageWithUser(this.token, 1).subscribe((res: any) => {
            this.dataSource.data = res.storages ? res.storages : [];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
		})
	}
}
