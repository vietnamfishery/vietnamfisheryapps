import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Storages } from 'src/app/models';
import { StorageManagementService } from '../storage-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';

@Component({
    selector: 'app-veterinary-management',
    templateUrl: './veterinary-management.component.html',
    styleUrls: ['./veterinary-management.component.scss']
})
export class VeterinaryManagementComponent implements OnInit {
    type: string = 'thuoc-&-duoc-pham';
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
        this.storageManagementService.getStorageWithUser(this.token, 2).subscribe((res: any) => {
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
}
