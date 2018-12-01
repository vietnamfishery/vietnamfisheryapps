import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { SeasionManagementService } from '../seasion-management.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { tokenName } from 'src/app/constants/constant';
import { SelectionModel } from '@angular/cdk/collections';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import * as jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-add-ponds',
    templateUrl: './add-ponds.component.html',
    styleUrls: ['./add-ponds.component.scss']
})
export class AddPondsComponent implements OnInit {
    
    preloader: boolean = false;
    season: any;
    seasonUUId: string;
    token: string;
    seasonName: string;
    ponds: any[] = [];
    ownerId: number;
    empty: boolean = false;
    displayedColumns: string[] = ['check', 'pondName', 'pondArea', 'pondDepth', 'createCost', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);

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
    }

    ngOnInit() {
        this.getPondList();
    }
    
    getPondList() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.seasonUUId = params.get('seasonUUId');
                return this.pondManagementService.getPondNotInSeasonAndPond({
                    seasonUUId: this.seasonUUId,
                    ownerId: this.ownerId
                }, this.token);
            })
        ).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                this.getSeasonByUUId()
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            this.dataSource.data = this.ponds; 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    getSeasonByUUId() {
        this.seasionManagementService.getSeasonBySeasonUUId(this.seasonUUId, this.token).subscribe(res => {
            this.season = res.season;
        })
    }

    reloadTable() {
        this.pondManagementService.getPondNotInSeasonAndPond({
            seasonUUId: this.seasonUUId
        }, this.token).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            this.dataSource.data = this.ponds;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    addWithChecker(data?: any) {
        if(!data) {
            const obj: object = {
                seasonId: this.season.seasonId,
                pondIdArr: this.selection.selected.map(e => {
                    return {
                        pondId: e.pondId,
                        userId: e.userId
                    }
                })
            }
            this.seasionManagementService.addSeasonAndPond(obj, this.token).subscribe(res => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.reloadTable()
            });
        } else {
            const obj: object = {
                seasonId: this.season.seasonId,
                pondIdArr: [data]
            }
            this.seasionManagementService.addSeasonAndPond(obj, this.token).subscribe(res => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.reloadTable()
            });
        }
    }
}
