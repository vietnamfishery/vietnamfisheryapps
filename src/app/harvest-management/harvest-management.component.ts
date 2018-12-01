import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { tokenName } from '../constants/constant';
import { AppService } from '../app.service';
import { PondManagementService } from '../pond-management/pond-management.service';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import * as jwtDecode from 'jwt-decode';
import { find } from 'lodash';
import { imagePlaceHolder } from '../constants/constant'

@Component({
  selector: 'app-harvest-management',
  templateUrl: './harvest-management.component.html',
  styleUrls: ['./harvest-management.component.scss']
})
export class HarvestManagementComponent implements OnInit {

    token: string;
    ponds: any[] = [];
    ownerId: number;
    isBoss: boolean = false;
    seasons: any[] = [];
    seasonPresent: any = {};

    preloader: boolean = false;

    realSeasonPresent: any = {};
    checkSeasonPresent: boolean = true;

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
        this.getSeason();
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

    goto(path) {
        this.router.navigate([path]);
    }

    gotoAnalysis(pondUUId: string) {
        this.router.navigate(['/quan-ly-thu-hoach/thong-ke', pondUUId, this.seasonPresent.seasonUUId])
    }

    getPond() {
        this.preloader = !this.preloader;
        this.pondManagementService.getPondAdvanced({
            image: false,
            isnotnull: true
        },this.token).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                this.getImage();
                if(!res.ponds.length) {
                    this.snackBar.open('Không tìm thấy ao khả dụng.', 'Đóng', {
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
            if(this.seasonPresent.seasonId !== this.realSeasonPresent.seasonId){
                this.checkSeasonPresent = false;
            } else {
                this.checkSeasonPresent = true;
            }
            this.preloader = !this.preloader;
        })
    }

    gotoAdd = (pondUUId: string) => {
        this.router.navigate(['/quan-ly-thu-hoach/them', pondUUId]);
    }

    changeSeason(season: any){
        this.seasonPresent = season;
        this.getAllPondWithSeasonUUId();
    }

    getAllPondWithSeasonUUId() {
        this.preloader = !this.preloader;
        this.pondManagementService.getPondAdvanced({
            image: false,
            isnotnull: true,
            seasonid: this.seasonPresent.seasonId
        }, this.token).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                this.getImage();
                if(!res.ponds.length) {
                    this.snackBar.open('Không tìm thấy ao khả dụng. Có thể ao chưa được thêm vào vụ nuôi.', 'Đóng', {
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
            if(this.seasonPresent.seasonId !== this.realSeasonPresent.seasonId){
                this.checkSeasonPresent = false;
            } else {
                this.checkSeasonPresent = true;
            }
            this.preloader = !this.preloader;
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


