import { Component, OnInit, ViewChild } from '@angular/core';

import { PeriodicElement } from '../../models/PeriodicElement';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import * as jwtDecode from 'jwt-decode';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';

import { find } from 'lodash';
import { StorageManagementService } from '../storage-management.service';

@Component({
    selector: 'app-coupon-management',
    templateUrl: './coupon-management.component.html',
    styleUrls: ['./coupon-management.component.scss']
})
export class CouponManagementComponent implements OnInit {

    displayedColumns: string[] = ['type', 'name', 'quatity', 'unitPrice', 'unit', 'createdDate'];
    dataSource = new MatTableDataSource<PeriodicElement>([]);
    token: string;
    ownerId: number;
    isBoss: boolean = false;
    seasons: any[] = [];
    seasonPresent: any = {};
    realSeasonPresent: any = {};
    checkSeasonPresent: boolean = true;

    coupons: Array<any> = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private seasionManagementService: SeasionManagementService,
		private storageManagementService: StorageManagementService,
        public snackBar: MatSnackBar,
        private appService: AppService
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getSeason() {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe(res => {
            if (res.success) {
                this.seasons = res.seasons;
                this.seasonPresent = find(this.seasons, (e) => e.status === 0);
                if(!this.seasonPresent) {
                    this.snackBar.open('Bạn không có vụ nào được kích hoạt, vui lòng kích hoạt một vụ mùa trong hệ thống.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.getCoupons(this.seasonPresent.seasonId)
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    changeSeason(season: any){
        this.seasonPresent = season;
        this.coupons = [];
        this.getCoupons(season.seasonId);
    }

    getCoupons(seasonId: number){
        this.storageManagementService.getCoupons(this.token, {seasonId}).subscribe(res => {
            if(res.success) {
                for(let coupon of res.coupons) {
                    if(!!coupon.materials.length) {
                        for(let material of coupon.materials){
                            let tmp: any = {
                                couponCreatedDate: coupon.createdDate,
                                ...material,
                                ...material.storage
                            }
                            this.coupons.push(tmp);
                        }
                    } else {
                        for(let bbd of coupon.boughtBreedDetails) {
                            let tmp: any = {
                                couponCreatedDate: coupon.createdDate,
                                ...bbd,
                                ...bbd.breed
                            }
                            this.coupons.push(tmp);
                        }
                    }
                }
                this.dataSource.data = this.coupons;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3500,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }
}
