import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/rootStores/models';

@Component({
    selector: 'app-harvest-management',
    templateUrl: './harvest-management.component.html',
    styleUrls: ['./harvest-management.component.scss']
})
export class HarvestManagementComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource<any>([]);
    displayedColumns: any = ["createdDate","name","quantity","unitPrice","season","pond","total"]
    constructor(
        public snackBar: MatSnackBar,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.store.select('harvestCost').subscribe(res => {
            if (!res.body.length) {
                this.dataSource = new MatTableDataSource<any>([]);
            } else {
                this.dataSource = new MatTableDataSource<any>([]);
                this.dataSource.data = res.body;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

}
