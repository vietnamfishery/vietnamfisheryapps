import { Component, OnInit } from '@angular/core';
import { PondprepareManagementService } from './pondprepare-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from './../constants/format-date';
import { tokenName } from '../../environments';
import { AppService } from '../app.service';
import * as moment from 'moment';
import { PondManagementService } from '../pond-management/pond-management.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pondprepare-management',
    templateUrl: './pondprepare-management.component.html',
    styleUrls: ['./pondprepare-management.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})

export class PondprepareManagementComponent implements OnInit {
    displayedColumns: string[] = ['Material', 'quantity', 'price'];
    preloader = false;
    pondprepare: any[] = [];
    token: string;
    constructor(
        private pondManagementService: PondManagementService,
        private snackBar: MatSnackBar,
        private router: Router,
        private pondprepareManagementService: PondprepareManagementService,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.preloader = !this.preloader;
        this.pondManagementService.getAllPond(this.token).subscribe((res) => {
            // if (res.success) {
            //     this.pondprepare = res.pondPrepare.map((element: any) => {
            //         return {
            //             pondprepareName: element.pondprepareName,
            //             pondprepareCreatedDate: moment(element.createdDate).format(`DD - MM - YYYY`),
            //             pondName: element.seasonAndPond.ponds.pondName,
            //             seasonName: element.seasonAndPond.seasons.seasonName,
            //             pondPrepareId: element.pondPrepareId,
            //             details: element.details
            //         }
            //     });
            // } else {
            //     this.snackBar.open(res.message, 'Đóng', {
            //         duration: 3000,
            //         horizontalPosition: "center",
            //         verticalPosition: 'top'
            //     });
            // }
            this.preloader = !this.preloader;
        });
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    panelOpenState = false;

    goto(path) {
        this.router.navigate([path]);
    }
}
