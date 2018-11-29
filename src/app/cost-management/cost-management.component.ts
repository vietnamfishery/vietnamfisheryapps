import { Component, OnInit } from '@angular/core';
import { CostService } from './cost.service';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import { find } from 'lodash';
import { AppService } from '../app.service';
import { tokenName } from 'src/environments';
import * as jwtDecode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-cost-management',
    templateUrl: './cost-management.component.html',
    styleUrls: ['./cost-management.component.scss']
})
export class CostManagementComponent implements OnInit {

    rows = [];

    // Bubble Chart
    bubbleChartData: Array<any> = [{
        data: [
            {
                x: 6,
                y: 5,
                r: 15,
            },
            {
                x: 5,
                y: 4,
                r: 10,
            },
            {
                x: 8,
                y: 4,
                r: 6,
            },
            {
                x: 8,
                y: 4,
                r: 6,
            },
            {
                x: 5,
                y: 14,
                r: 14,
            },
            {
                x: 5,
                y: 6,
                r: 8,
            },
            {
                x: 4,
                y: 2,
                r: 10,
            }
        ],
        label: 'Series A',
        borderWidth: 1
    }];
    bubbleChartType = 'bubble';

    // Shared chart options
    globalChartOptions: any = {
        responsive: true,
        legend: {
            display: false,
            position: 'bottom'
        }
    };

    // Bar
    barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7'];
    barChartType = 'bar';
    barChartLegend = true;
    barChartData: any[] = [{
        data: [6, 5, 8, 8, 5, 5, 4],
        label: 'Series A',
        borderWidth: 0
    }, {
        data: [5, 4, 4, 2, 6, 2, 5],
        label: 'Series B',
        borderWidth: 0
    }];
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

    // combo chart
    comboChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
    chartColors: Array<any> = [
        { // grey
            backgroundColor: '#7986cb',
            borderColor: '#3f51b5',
            pointBackgroundColor: '#3f51b5',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
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
    comboChartLegend = true;
    ComboChartData: Array<any> = [
        {
            data: [6, 5, 8, 8, 5, 5, 4],
            label: 'Series A',
            borderWidth: 1,
            type: 'line',
            fill: false
        },
        {
            data: [5, 4, 4, 2, 6, 2, 5],
            label: 'Series B',
            borderWidth: 1,
            type: 'bar',
        }
    ];
    ComboChartOptions: any = Object.assign({
        animation: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(0,0,0,0.02)',
                        zeroLineColor: 'rgba(0,0,0,0.02)'
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(0,0,0,0.02)',
                        zeroLineColor: 'rgba(0,0,0,0.02)'
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 9,
                    }
                }
            ]
        }
    }, this.globalChartOptions);

    seasons: any[] = [];
    seasonPresent: any;
    token: string;
    ownerId: number;
    isBoss: boolean = false;

    constructor(
        private seasionManagementService: SeasionManagementService,
        public snackBar: MatSnackBar,
        private appService: AppService,
        costService: CostService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if(deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
    }

    getSeason() {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe(res => {
            if (res.success) {
                this.seasons = res.seasons;
                this.seasonPresent = find(this.seasons, (e) => e.status === 0);
                if(!this.seasonPresent) {
                    this.snackBar.open('Bạn không có vụ nào được kích hoạt, vui lòng thêm một vụ mùa vào hệ thống.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }

            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    getCost() {

    }
}
