import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { switchMap } from 'rxjs/operators';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';
import { HarvestManagementService } from '../harvest-management.service';
import { tokenName } from '../../constants/constant';

@Component({
    selector: 'app-analysis-harvest',
    templateUrl: './analysis-harvest.component.html',
    styleUrls: ['./analysis-harvest.component.scss']
})
export class AnalysisHarvestComponent implements OnInit {

    preloader: boolean = false;
    pondUUId: string;
    seasonUUId: string;
    pond: any = {};
    season: any = {};
    token: string;

    displayedColumns: string[] = ['harvestName', 'quantity', 'unitPrice', 'breedName', 'stockingQuantity', 'unit'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private pondManagementService: PondManagementService,
        private seasionManagementService: SeasionManagementService,
        private harvestManagementService: HarvestManagementService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.init()
    }

    init() {
        this.route.paramMap.pipe(
            switchMap((params: any) => {
                this.pondUUId = params.get('pondUUId');
                this.seasonUUId = params.get('seasonUUId')
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })).subscribe(res => {
                if (res.success) {
                    this.pond = res.pond;
                    this.seasionManagementService.getSeasonBySeasonUUId(this.seasonUUId, this.token).subscribe(res$ => {
                        if (res.success) {
                            this.season = res$.season;
                            this.getHarvest();
                        } else {
                            this.snackBar.open(res.message, 'Đóng', {
                                duration: 3000,
                                horizontalPosition: "center",
                                verticalPosition: 'top'
                            });
                        }
                    })
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
            });
    }
    
    getHarvest() {
        this.harvestManagementService.getHarvest({
            seasonId: this.season.seasonId,
            pondId: this.pond.pondId
        }, this.token).subscribe(res => {
            const tmp: Array<any> = [];
            const data: any = {};
            if(res.success) {
                for(let harvest of res.harvests) {
                    for(let stocking of harvest.harvestsnp.stocking) {
                        data.breedName = stocking.details.breed.breedName;
                        data.stockingQuantity = stocking.details.stockingQuantity;
                        data.unit = stocking.details.breed.unit;
                    }
                    for(let details of harvest.details) {
                        data.quantity = details.quantity
                        data.unitPrice = details.unitPrice
                    }
                    data.harvestName = harvest.harvestName;
                    tmp.push(data)
                }
                this.dataSource.data = tmp;
                this.dataSource.sort = this.sort
                this.dataSource.paginator = this.paginator
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        });
    }
}
