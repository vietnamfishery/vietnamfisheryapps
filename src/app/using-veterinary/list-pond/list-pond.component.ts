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
    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private router: Router,
        private pondManagementService: PondManagementService,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
        this.isBoss = (jwtDecode(this.token) as any).createdBy === null;
    }

    ngOnInit() {
        this.preloader = !this.preloader;
        this.reloadPond();
    }

    reloadPond = () => {
        this.pondManagementService.getAllPond(this.token).subscribe((res: any) => {
            if (res.success) {
                this.ponds = res.ponds.map((element: any) => {
                    return {
                        pondUUId: element.pondUUId,
                        status: element.status,
                        pondName: element.pondName,
                        pondCreatedDate: moment(element.pondCreatedDate).format(`DD - MM - YYYY`),
                        images: element.images,
                        pondId: element.pondId,
                        employees: element.users
                    }
                });
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            }
            this.preloader = !this.preloader;
        });
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    gotoAdd = (pondUUId: string) => {
        this.router.navigate(['/su-dung-thuoc-&-duoc-pham/them', pondUUId]);
    }
}
