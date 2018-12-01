import { Component, OnInit } from '@angular/core';
import { WasteManagementService } from './waste-management.service';
import { AppService } from '../app.service';
import {  tokenName } from '../constants/constant';
import { MatSnackBar } from '@angular/material';
import * as jwtDecode from 'jwt-decode';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SeasionManagementService } from '../seasion-management/seasion-management.service';
import { PondManagementService } from '../pond-management/pond-management.service';
import { Router } from '@angular/router';
import { find } from 'lodash';

@Component({
    selector: 'app-waste-management',
    templateUrl: './waste-management.component.html',
    styleUrls: ['./waste-management.component.scss']
})
export class WasteManagementComponent implements OnInit {

    panelOpenState = false;
    wastes: any[] = [];
    preloader: boolean = false;
    token: string;
    ownerId: number;
    isBoss: boolean;
    step = -1;
    form: FormGroup;

    seasonPresent: any = {};
    realSeasonPresent: any = {};
    checkSeasonPresent: boolean = true;
    seasons: any[] = [];

    initPond: any = {};
    ponds: any[] = [];

    seasonSelected: any = {};
    pondSelected: any = {};
    selected: any = {};
    selected2: any = {};
    constructor(
        private appService: AppService,
        private fb: FormBuilder,
        private wasteManagementService: WasteManagementService,
        private router: Router,
        private seasionManagementService: SeasionManagementService,
        private pondManagementService: PondManagementService,

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
                this.ponds = res.ponds;
                this.initPond = this.ponds[0];
                this.getWates();
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
                this.seasonPresent = find(res.seasons, e => e.status === 0);
                this.realSeasonPresent = this.seasonPresent;
                this.seasonSelected = this.seasonPresent;
                if(!this.seasonPresent) {
                    this.snackBar.open('Bạn không có vụ nào được kích hoạt, vui lòng kích hoạt một vụ mùa trong hệ thống.', 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                    this.router.navigate['/quan-ly-chat-thai']
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
        if(this.seasonPresent.seasonId !== this.realSeasonPresent.seasonId){
            this.checkSeasonPresent = false;
        } else {
            this.checkSeasonPresent = true;
        }
        this.getAllPondWithSeasonUUId();
    }
    
    changePond(pond: any) {
        this.initPond = pond;
        this.getWates();
    }

    getWates() {
        this.preloader = !this.preloader;
        const obj: any = {
            seasonId: this.seasonPresent.seasonId,
            pondId: this.initPond ? this.initPond.pondId : null,
            ownerId: this.ownerId
        }
        this.wasteManagementService.getAllWaste(obj, this.token).subscribe(res => {
            if (res.success) {
                this.wastes = res.wastes;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
            this.preloader = false;
        })
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    goto(diedFisheryUUId: string) {
        console.log(diedFisheryUUId);
    }
}
