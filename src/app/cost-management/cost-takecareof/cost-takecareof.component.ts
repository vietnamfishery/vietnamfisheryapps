import { Component, OnInit, ViewChild } from '@angular/core';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { AppState } from 'src/app/rootStores/models/model';
import { Store } from '@ngrx/store';
import { CostService } from '../cost.service';
import * as jwtDecode from 'jwt-decode';
import { tokenName } from 'src/app/constants/constant';

@Component({
    selector: 'app-cost-takecareof',
    templateUrl: './cost-takecareof.component.html',
    styleUrls: ['./cost-takecareof.component.scss']
})
export class CostTakecareofComponent implements OnInit {

    token: string;
    ownerId: number;
    isBoss: boolean = false;
    totalAll: number = null;
    dataSource: any = [];
    displayedColumns: any = ["createdDate", "name", "quantity", "unitPrice", "unit"];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public snackBar: MatSnackBar,
        private appService: AppService,
        private store: Store<AppState>
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if (deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
        this.store.select('breedCost').subscribe(res => {
            if(!res.body.length) {
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
