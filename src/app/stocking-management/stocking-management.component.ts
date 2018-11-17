import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../models/PeriodicElement';
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

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<PeriodicElement>([]);
    form: FormGroup;

    stocking: any[] = [];

    token: string;
    ownerId: number;
    isBoss: boolean = false;
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
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.createForm();
        this.getSeason();

    }

    createForm() {
        this.form = this.fb.group({
            pond: [null, Validators.compose([Validators.required])],
            season: [this.seasonPresent.seasonId, Validators.compose([Validators.required])],
        })
    }

    getAllPondWithSeasonUUId() {
        this.pondManagementService.getPondBySeasonUUId({
            seasonUUId: this.seasonPresent.seasonUUId,
            ownerId: this.ownerId
        }, this.token).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                this.initPond = this.ponds[0];
                this.getStocking();
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            this.form.patchValue({
                pond: this.initPond
            })
            this.preloader = !this.preloader;
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
                this.getAllPondWithSeasonUUId();
                this.form.patchValue({
                    season: this.seasonPresent
                });
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

    changeSeason(season: any) {
        this.seasonPresent = season;
        if (this.seasonPresent.seasonId !== this.realSeasonPresent.seasonId) {
            this.checkSeasonPresent = false;
        } else {
            this.checkSeasonPresent = true;
        }
        this.getAllPondWithSeasonUUId();
    }

    changePond(pond: any) {
        this.initPond = pond;
        this.getStocking();
    }

    getStocking() {
        const obj: any = {
            seasonId: this.seasonPresent.seasonId,
            pondId: this.initPond ? this.initPond.pondId : null,
            ownerId: this.ownerId
        }
        this.stockingService.getStocking(obj, this.token).subscribe(res => {
            if (res.success) {
                this.stocking = res.stocking;
                console.log(this.stocking);
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
