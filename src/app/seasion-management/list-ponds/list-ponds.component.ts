import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../../models/PeriodicElement';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { SeasionManagementService } from '../seasion-management.service';

@Component({
    selector: 'app-list-ponds',
    templateUrl: './list-ponds.component.html',
    styleUrls: ['./list-ponds.component.scss']
})
export class ListPondsComponent implements OnInit {
    ponds: any = {};
    season: any = {};
    seasonUUId: any;
    token: string;
    seasonName: string;
    displayedColumns: string[] = ['pondName', 'status'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        private route: ActivatedRoute,
        private appService: AppService,
        private seasionManagementService: SeasionManagementService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.seasonUUId = params.get('seasonUUId');
                return this.seasionManagementService.getPondBySeasonUUId(this.seasonUUId, this.token);
            })
        ).subscribe(res => {
            this.ponds = res.ponds;
            this.dataSource.data = this.ponds
            this.getSeasonBySeasonUUId();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    getSeasonBySeasonUUId() {
        this.seasionManagementService.getSeasonBySeasonUUId(this.seasonUUId, this.token).subscribe(res => {
            this.season = res.season;
        })
    }
}
