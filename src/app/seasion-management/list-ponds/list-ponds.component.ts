import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import { SeasionManagementService } from '../seasion-management.service';
import * as jwtDecode from 'jwt-decode';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';

@Component({
    selector: 'app-list-ponds',
    templateUrl: './list-ponds.component.html',
    styleUrls: ['./list-ponds.component.scss']
})
export class ListPondsComponent implements OnInit {
    
    preloader: boolean = false;
    ponds: any = {};
    season: any = {};
    seasonUUId: any;
    token: string;
    seasonName: string;
    displayedColumns: string[] = ['pondName', 'status', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    ownerId: number;
    isBoss: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private appService: AppService,
        private seasionManagementService: SeasionManagementService,
        private pondManagementService: PondManagementService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if(deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.seasonUUId = params.get('seasonUUId');
                return this.pondManagementService.getAllPond(this.token, {
                    seasonUUId: this.seasonUUId
                });
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

    updatePond(pond: any) {
        const data: any = {
            ...pond,
            status: 0
        }
        this.pondManagementService.updatePond(data, this.token).subscribe(res => {
            this.snackBar.open(res.message, 'Đóng', {
                duration: 3000,
                horizontalPosition: "center",
                verticalPosition: 'top'
            });
            this.pondManagementService.getAllPond(this.token, {
                seasonUUId: this.seasonUUId
            }).subscribe(res => {
                this.ponds = res.ponds;
                this.dataSource.data = this.ponds
                this.getSeasonBySeasonUUId();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        })
    }
}
