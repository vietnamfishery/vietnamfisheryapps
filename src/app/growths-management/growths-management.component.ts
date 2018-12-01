import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GrowthsManagementService } from './growths-management.service';
import { MatSnackBar } from '@angular/material';
import { tokenName } from '../constants/constant';
import * as moment from 'moment';
import * as jwtDecode from 'jwt-decode';
import { PondManagementService } from '../pond-management/pond-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import { Router } from '@angular/router';
import { find } from 'lodash';

@Component({
    selector: 'app-growths-management',
    templateUrl: './growths-management.component.html',
    styleUrls: ['./growths-management.component.scss']
})
export class GrowthsManagementComponent implements OnInit {
    stacked = false;
    growths: any[] = [];
    preloader: boolean = false;
    form: FormGroup;
    
    token: string;
    ownerId: number;
    isBoss: boolean = false;

    seasonPresent: any = {};
    realSeasonPresent: any = {};
    checkSeasonPresent: boolean = true;
    seasons: any[] = [];

    initPond: any = {};
    ponds: any[] = [];
    seasonSelected: any = {};
    pondSelected: any = {};

    constructor(
        private appService: AppService,
        private growthsManagementService: GrowthsManagementService,
        private seasionManagementService: SeasionManagementService,
        private router: Router,
        private fb: FormBuilder,
        private pondManagementService: PondManagementService,
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
        this.preloader = !this.preloader;
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
                if(res.ponds.length == 0){
                    this.snackBar.open('Bạn không có ao nuôi nào trong vụ nuôi vừa chọn', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.ponds = res.ponds;
                this.initPond = this.ponds[0];
                this.getGrowth();
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
            this.form.patchValue({
                pond: this.initPond
            })
            this.preloader = !this.preloader;
        })
    }

    getSeason() {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe(res => {
            if (res.success) {
                this.seasonPresent = find(res.seasons, e => e.status === 0);
                this.seasonSelected = this.seasonPresent;
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

    getPond() {
        this.preloader = !this.preloader;
        this.pondManagementService.getPondAdvanced({
            image: true
        },this.token).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
                if(!res.ponds.length) {
                    this.snackBar.open('Không tìm thấy ao khả dụng.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.getImage();
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

    async getImage() {
        const arr = [];
        for(let p of this.ponds){
            p[`image`] = await this.appService.loadImage(p.images);
            arr.push(p);
        }
        this.ponds = arr;
    }

    changeSeason(season: any) {
        this.seasonPresent = season;
        this.getAllPondWithSeasonUUId();
    }
    
    changePond(pond: any) {
        this.initPond = pond;
        this.getGrowth();
    }

    getGrowth() {
        const obj: any = {
            seasonId: this.seasonPresent.seasonId,
            pondId: this.initPond ? this.initPond.pondId : null,
            ownerId: this.ownerId
        }
        this.growthsManagementService.getGrowth(obj, this.token).subscribe(res => {
            if (res.success) {
                this.growths = res.growths.map(e => {
                    e['createdDate'] = moment(e[`createdDate`]).format(`DD - MM - YYYY`)
                    return e;
                })
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

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

}
