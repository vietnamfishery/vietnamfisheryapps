import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tokenName } from 'src/environments';
import { AppService } from '../app.service';
import * as jwtDecode from 'jwt-decode';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import { PondManagementService } from '../pond-management/pond-management.service';
import { Router } from '@angular/router';
import { StockingService } from './stocking.service';
import * as moment from 'moment';

@Component({
    selector: 'app-stocking-management',
    templateUrl: './stocking-management.component.html',
    styleUrls: ['./stocking-management.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ]
})
export class StockingManagementComponent implements OnInit {
    
    isBoss: boolean = false;
    displayedColumns: string[] = this.isBoss ? ['pondName', 'breedName', 'totalQuantity', 'createdDate', 'action'] : ['pondName', 'breedName', 'totalQuantity', 'createdDate'];
    dataSource = new MatTableDataSource<any>([]);
    form: FormGroup;

    stocking: any[] = [];

    token: string;
    ownerId: number;
    preloader: boolean = false;

    seasonPresent: any = {};
    realSeasonPresent: any = {};
    checkSeasonPresent: boolean = true;
    seasons: any[] = [];

    initPond: any = {};
    ponds: any[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    constructor(
        private appService: AppService,
        private fb: FormBuilder,
        private seasionManagementService: SeasionManagementService,
        private router: Router,
        private pondManagementService: PondManagementService,
        private stockingService: StockingService,
        public snackBar: MatSnackBar
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if (deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
        this.displayedColumns = this.isBoss ? ['pondName', 'breedName', 'totalQuantity', 'createdDate', 'action'] : ['pondName', 'breedName', 'totalQuantity', 'createdDate'];
    }

    ngOnInit() {
        if(this.isBoss) {
            this.initBoss();
        } else {
            this.initEmployee();
        }
    }
    
    initBoss() {
        this.createForm();
        this.getSeason();
    }

    initEmployee() {
        this.getSeasonEmp();
    }

    createForm() {
        this.form = this.fb.group({
            season: [this.seasonPresent.seasonId, Validators.compose([Validators.required])],
        })
    }

    getSeason() {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe(res => {
            if (res.success) {
                this.seasons = res.seasons;
                for (let i = 0; i < res.seasons.length; i++) {
                    if (res.seasons[i].status === 0) {
                        this.seasonPresent = res.seasons[i]
                        this.realSeasonPresent = res.seasons[i]
                        break;
                    }
                    if (i === res.seasons.length - 1) {
                        this.snackBar.open('Bạn không có vụ nào được kích hoạt, vui lòng kích hoạt một vụ mùa trong hệ thống.', 'Đóng', {
                            duration: 3000,
                            horizontalPosition: "center",
                            verticalPosition: 'top'
                        });
                        this.router.navigate['/quan-ly-vu-nuoi']
                    }
                }
                this.form.patchValue({
                    season: this.seasonPresent
                });
                this.getStocking();
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            this.preloader = !this.preloader;
        })
    }

    getSeasonEmp() {
        this.seasionManagementService.getPresentSeason(this.ownerId, this.token).subscribe(res => {
            if (res.success) {
                this.seasons = res.seasons;
                this.seasonPresent = res.season;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
                this.router.navigate['/quan-ly-vu-nuoi']
            }
            this.preloader = !this.preloader;
        })
    }

    changeSeason(season: any) {
        this.seasonPresent = season;
        this.getStocking();
    }

    changePond(pond: any) {
        this.initPond = pond;
        this.getStocking();
    }

    getStocking() {
        const obj: any = {
            seasonId: this.seasonPresent.seasonId,
            ownerId: this.ownerId
        }
        this.stockingService.getStocking(obj, this.token).subscribe(res => {
            if (res.success) {
                this.stocking = res.stocking.map(e => {
                    e['createdDate'] = moment(e[`createdDate`]).format(`DD - MM - YYYY`);
                    return e;
                });
                this.loadTable();
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            if(this.seasonPresent.seasonId !== this.realSeasonPresent.seasonId){
                this.checkSeasonPresent = false;
            } else {
                this.checkSeasonPresent = true;
            }
            this.preloader = !this.preloader;
        })
    }

    loadTable() {
        this.dataSource.data = this.stocking;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    gotoEdit(stockingDetailUUId: string) {
        this.router.navigate(['/quan-ly-tha-nuoi/cap-nhat', stockingDetailUUId]);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
