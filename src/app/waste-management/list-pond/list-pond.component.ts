import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { imagePlaceHolder } from '../../constants/constant';

@Component({
    selector: 'app-list-pond',
    templateUrl: './list-pond.component.html',
    styleUrls: ['./list-pond.component.scss']
})
export class ListPondComponent implements OnInit {
    imageLink: string = '';
    pondCreatedDate: string;
    ponds: any[] = [];

    animal: string;
    name: string;
    preloader: boolean = false;
    token: string;
    isBoss: boolean;
    ownerId: number;

    seasonUUId: string;

    imagePlaceHolder: string = imagePlaceHolder;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private router: Router,
        private pondManagementService: PondManagementService,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        this.isBoss = (jwtDecode(this.token) as any).createdBy === null;
    }

    ngOnInit() {
        this.preloader = !this.preloader;
        this.init();
    }

    init() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.seasonUUId = params.get('seasonUUId');
                return this.pondManagementService.getAllPond(this.token, {
                    status: 'notnull',
                    seasonUUId: this.seasonUUId
                });
            })).subscribe(res => {
                if (res.success) {
                    this.ponds = res.ponds;
                    this.getImage();
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.preloader = !this.preloader;
                return;
            })
        this.getPond()
    }

    getPond() {
        this.preloader = !this.preloader;
        this.pondManagementService.getAllPond(this.token, {
            status: 'notnull',
            seasonUUId: this.seasonUUId
        }).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds;
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

    reloadPond = () => {
        const obj: any = {
            ownerId: this.ownerId,
            status: 1
        }
        this.pondManagementService.getAllPondWithPresentSeasonWithImage(obj, this.token).subscribe(res => {
            if (res.success) {
                this.ponds = res.ponds.map(e => {
                    e[`pondCreatedDate`] = moment(e.pondCreatedDate).format(`DD - MM - YYYY`);
                    return e;
                });
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            }
            this.preloader = !this.preloader;
        })
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    gotoAdd = (pondUUId: string) => {
        this.router.navigate(['/quan-ly-chat-thai/them', pondUUId]);
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
