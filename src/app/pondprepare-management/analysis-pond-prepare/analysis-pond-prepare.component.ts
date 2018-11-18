import { Component, OnInit } from '@angular/core';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { PondprepareManagementService } from '../pondprepare-management.service';
import { tokenName } from 'src/environments';
import { switchMap } from 'rxjs/operators';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';

@Component({
    selector: 'app-analysis-pond-prepare',
    templateUrl: './analysis-pond-prepare.component.html',
    styleUrls: ['./analysis-pond-prepare.component.scss']
})
export class AnalysisPondPrepareComponent implements OnInit {
    displayedColumns: string[] = ['material', 'quantity'];
    preloader = false;
    pondprepare: any[] = [];
    token: string;
    pondUUId: string;
    seasonUUId: string;
    pond: any = {};
    season: any = {};
    pondPrepares: any[] = [];
    constructor(
        private pondManagementService: PondManagementService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private pondprepareManagementService: PondprepareManagementService,
        private seasionManagementService: SeasionManagementService,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.pondUUId = params.get('pondUUId');
                this.seasonUUId = params.get('seasonUUId')
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })).subscribe(res => {
                if (res.success) {
                    this.pond = res.pond;
                    this.seasionManagementService.getSeasonBySeasonUUId(this.seasonUUId, this.token).subscribe(res$ => {
                        if (res.success) {
                            this.season = res$.season;
                            this.getPondPrepare();
                        } else {
                            this.snackBar.open(res.message, 'Đóng', {
                                duration: 3000,
                                horizontalPosition: "center",
                                verticalPosition: 'top'
                            });
                            this.goto('/')
                        }
                    })
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                    this.goto('/')
                }
            });
    }

    getPondPrepare() {
        this.pondprepareManagementService.getAllPondPrepare({
            seasonId: this.season.seasonId,
            pondId: this.pond.pondId
        }, this.token).subscribe(res => {
            if (res.success) {
                this.pondPrepares = res.pondPrepares;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    panelOpenState = false;

    goto(path$: string) {
        this.router.navigate([path$]);
    }

    gotoAdd(pondPrepareUUId: any) {
        this.router.navigate([this.router.url + '/chi-phi-phat-sinh/them', pondPrepareUUId])
    }

    gotoEdit(pondPrepareUUId: any) {
        this.router.navigate([this.router.url + '/chi-phi-phat-sinh/cap-nhat', pondPrepareUUId])
    }
}
