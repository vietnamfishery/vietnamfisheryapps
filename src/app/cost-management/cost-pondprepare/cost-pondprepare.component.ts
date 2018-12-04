import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CostService } from '../cost.service';
import { AppService } from 'src/app/app.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/rootStores/models/model';

@Component({
    selector: 'app-cost-pondprepare',
    templateUrl: './cost-pondprepare.component.html',
    styleUrls: ['./cost-pondprepare.component.scss']
})
export class CostPondprepareComponent implements OnInit {

    displayedColumns: string[] = ['createdDate', 'name', 'quantity', 'unitPrice', 'unit', 'type'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private appService: AppService,
        private store: Store<AppState>,
        private costService: CostService
    ) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.store.select('storageCost').subscribe(res => {
            // console.log(res);
            if(!res.body.length) {
                this.dataSource = new MatTableDataSource<any>([]);
            } else {
                this.dataSource.data = res.body;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

}
