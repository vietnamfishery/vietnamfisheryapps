import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/environments';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

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
    imgSource: string = '';
    preloader: boolean = false;
    token: string;
    isBoss: boolean;
    ownerId: number;
    constructor(
        public dialog: MatDialog,
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
        this.reloadPond();
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
}