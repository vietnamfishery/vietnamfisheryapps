import { Component, OnInit } from '@angular/core';
import { CostService } from './cost.service';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import { find } from 'lodash';
import { AppService } from '../app.service';
import * as jwtDecode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';
import { tokenName } from '../constants/constant';
import { Store } from '@ngrx/store';
import { AppState } from '../rootStores/models/model';
import { GetCost } from '../rootStores/actions'
import { Router } from '@angular/router';

@Component({
    selector: 'app-cost-management',
    templateUrl: './cost-management.component.html',
    styleUrls: ['./cost-management.component.scss']
})
export class CostManagementComponent implements OnInit {

    flagLoadChart: string = 'storage';
    rows = [];

    // Shared chart options
    globalChartOptions: any = {
        responsive: true,
        legend: {
            display: false,
            position: 'bottom'
        }
    };

    // Bar
    barChartLabels: string[] = [];
    barChartType = 'bar';
    barChartLegend = true;
    barChartDataStorage: any[] = [
        {
            data: [],
            label: 'Thức ăn',
            borderWidth: 0
        },
        {
            data: [],
            label: 'Cơ sở vật chất',
            borderWidth: 0
        },
        {
            data: [],
            label: 'Thuốc và dược phẩm',
            borderWidth: 0
        }
    ];
    barChartDataBreed: any[] = [
        {
            data: [],
            label: 'Tổng chi phí nhập giống',
            borderWidth: 0
        }
    ];
    barChartDataHarvest: any[] = [
        {
            data: [],
            label: 'Tổng giá trị thu hoạch',
            borderWidth: 0
        }
    ];
    barChartOptions: any = Object.assign({
        scaleShowVerticalLines: false,
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(0,0,0,0.02)',
                        defaultFontColor: 'rgba(0,0,0,0.02)',
                        zeroLineColor: 'rgba(0,0,0,0.02)'
                    },
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(0,0,0,0.02)',
                        defaultFontColor: 'rgba(0,0,0,0.02)',
                        zeroLineColor: 'rgba(0,0,0,0.02)'
                    },
                    stacked: true
                }
            ]
        }
    }, this.globalChartOptions);

    chartColors: Array<any> = [
        { // thức ăn
            backgroundColor: '#E8CC86',
            borderColor: '#E8C16D',
            pointBackgroundColor: '#E8C16D',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // Cơ sở vật chất
            backgroundColor: '#7986cb',
            borderColor: '#3f51b5',
            pointBackgroundColor: '#3f51b5',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            backgroundColor: '#34A44A',
            borderColor: '#2A873C',
            pointBackgroundColor: '#2A873C',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(56,181,80,0.8)'
        },
        { // dark grey
            backgroundColor: '#eeeeee',
            borderColor: '#e0e0e0',
            pointBackgroundColor: '#e0e0e0',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    seasons: any[] = [];
    seasonPresent: any;
    token: string;
    ownerId: number;
    isBoss: boolean = false;
    totalAll: number = null;

    constructor(
        private seasionManagementService: SeasionManagementService,
        public snackBar: MatSnackBar,
        private router: Router,
        private appService: AppService,
        private store: Store<AppState>,
        private costService: CostService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if (deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
        this.getSeason();
    }

    getSeason() {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe(res => {
            if (res.success) {
                this.seasons = res.seasons;
                this.seasonPresent = find(this.seasons, (e) => e.status === 0);
                if (!this.seasonPresent) {
                    this.snackBar.open('Bạn không có vụ nào được kích hoạt, vui lòng thêm một vụ mùa vào hệ thống.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.changeSeason(this.seasonPresent);
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    changeSeason(season: any) {
        this.seasonPresent = season;
        switch (this.flagLoadChart) {
            case 'storage':
                this.getStorageCost();
                break;
            case 'breed':
                this.getBreedCost();
                break;
            case 'harvest':
                this.getHarvestCost();
                break;
            default:
                this.getStorageCost();
                break;
        }
    }

    getStorageCost() {
        this.barChartDataStorage = [
            {
                data: [],
                label: 'Thức ăn',
                borderWidth: 0
            },
            {
                data: [],
                label: 'Cơ sở vật chất',
                borderWidth: 0
            },
            {
                data: [],
                label: 'Thuốc và dược phẩm',
                borderWidth: 0
            }
        ];
        this.costService.getCost(this.token, {
            seasonUUId: /*'c58b1aa5-d25f-47a4-977d-340c1f942d23'*/ this.seasonPresent.seasonUUId
        }, 'storage').subscribe(res => {
            if (res.success) {
                const chartExtracted: any = this.costService.extractStorageCoupons(res.charts);
                const tableExtracted: any = this.costService.extractStorageCoupons(res.tables);
                this.barChartLabels = res.labels;
                for (let i = 0; i < this.barChartDataStorage.length; i++) {
                    if (chartExtracted[i]) {
                        this.barChartDataStorage[chartExtracted[i].type].data.push(chartExtracted[i].totals)
                    } else {
                        this.barChartDataStorage[i].data.push(0)
                    }
                }
                this.store.dispatch(new GetCost(tableExtracted));
            } else {
                this.store.dispatch(new GetCost(res.tables))
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
                this.barChartLabels = []
                this.barChartDataStorage = [
                    {
                        data: [],
                        label: 'Thức ăn',
                        borderWidth: 0
                    },
                    {
                        data: [],
                        label: 'Cơ sở vật chất',
                        borderWidth: 0
                    },
                    {
                        data: [],
                        label: 'Thuốc và dược phẩm',
                        borderWidth: 0
                    }
                ];
            }
        });
    }

    getBreedCost() {
        this.barChartLabels = [];
        this.barChartDataBreed = [
            {
                data: [],
                label: '',
                borderWidth: 0
            }
        ];
        this.costService.getCost(this.token, {
            seasonUUId: this.seasonPresent.seasonUUId
        }, 'breed').subscribe(res => {
            if (res.success) {
                const labels: any[] = res.labels;
                this.barChartLabels = labels.map((e: any) => {
                    return e.createdDate;
                });
                this.barChartDataBreed[0].data = labels.map((e: any) => {
                    return e.totals;
                })
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
                this.barChartLabels = []
                this.barChartDataBreed = [
                    {
                        data: [],
                        label: 'Tổng chi phí nhập giống',
                        borderWidth: 0
                    }
                ];
            }
        })
    }

    getHarvestCost() {
        this.barChartLabels = [];
        this.barChartDataHarvest = [
            {
                data: [],
                label: '',
                borderWidth: 0
            }
        ];
        this.costService.getCost(this.token, {
            seasonUUId: this.seasonPresent.seasonUUId
        }, 'harvest').subscribe(res => {
            if (res.success) {
                const labels: any[] = res.charts;
                this.barChartLabels = labels.map(e => e.createdDate);
                this.barChartDataHarvest[0].data = labels.map(e => e.totals);
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
                this.barChartLabels = []
                this.barChartDataHarvest = [
                    {
                        data: [],
                        label: 'Tổng giá trị thu hoạch',
                        borderWidth: 0
                    }
                ];
            }
        })
    }

    goto(path: string, flag: string) {
        this.flagLoadChart = flag;
        this.changeSeason(this.seasonPresent);
        this.router.navigate([path]);
    }
}