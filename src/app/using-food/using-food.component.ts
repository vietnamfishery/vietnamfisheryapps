import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PondManagementService } from '../pond-management/pond-management.service';
import { AppService } from '../app.service';
import { tokenName } from 'src/app/constants/constant';
import * as jwtDecode from 'jwt-decode';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import { MatSnackBar } from '@angular/material';
import { find } from 'lodash';
import { imagePlaceHolder } from '../constants/constant';

@Component({
    selector: 'app-using-food',
    templateUrl: './using-food.component.html',
    styleUrls: ['./using-food.component.scss']
})
export class UsingFoodComponent implements OnInit {
    token: string;
    ponds: any[] = [];
    ownerId: number;
    isBoss: boolean = false;
    seasons: any[] = [];
    seasonPresent: any = {};
    selected: any = {};
    preloader: boolean = false;

    realSeasonPresent: any = {};
    checkSeasonPresent: boolean = true;

    snp: any = {};

    imagePlaceHolder: string = imagePlaceHolder;

    constructor(
        private pondManagementService: PondManagementService,
        private seasionManagementService: SeasionManagementService,
        private router: Router,
        private appService: AppService,
        public snackBar: MatSnackBar
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if(deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
        this.getSeason()
    }

    getSeason() {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe(res => {
            if (res.success) {
                this.seasons = res.seasons;
                this.seasonPresent = find(res.seasons, e => e.status === 0);
                this.realSeasonPresent = this.seasonPresent;
                if(!this.seasonPresent) {
                    this.snackBar.open('Bạn không có vụ nào được kích hoạt, vui lòng kích hoạt một vụ mùa trong hệ thống.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                    this.router.navigate['/quan-ly-chat-thai']
                }
                if(this.isBoss) {
                    this.getAllPondWithSeasonUUId();
                } else {
                    this.getPond();
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

    goto(path: string) {
        this.router.navigate([path]);
    }

    getPond() {
        this.preloader = true;
        this.pondManagementService.getAllPond(this.token, {
            status: 1
        }).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                if(!res.ponds.length) {
                    this.snackBar.open('Không tìm thấy ao khả dụng.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.getImage()
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
            this.preloader = false;
        })
    }

    gotoAdd = (pondUUId: string) => {
        this.router.navigate(['/cho-an/them', pondUUId]);
    }

    gotoAnalysis = (pondUUId: string) => {
        this.router.navigate(['/cho-an/thong-ke', pondUUId, this.seasonPresent.seasonUUId]);
    }

    changeSeason(season: any){
        this.seasonPresent = season;
        this.getAllPondWithSeasonUUId();
    }

    getAllPondWithSeasonUUId() {
        this.preloader = true;
        this.pondManagementService.getAllPond(this.token, {
            status: 1,
            seasonUUId: this.seasonPresent.seasonUUId
        }).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                if(!res.ponds.length) {
                    this.snackBar.open('Không tìm thấy ao khả dụng.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.getImage()
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
            this.preloader = false;
        })
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    
    async getImage() {
        const arr = [];
        for(let p of this.ponds){
            p[`image`] = await this.appService.loadImage(p.images);
            arr.push(p);
        }
        this.ponds = arr;
    }
}
