import { Component, OnInit, } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PondManagementService } from './pond-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import * as moment from 'moment';
import { DialogAddRole } from './dialog-add-role.component';
import * as jwtDecode from 'jwt-decode';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-pond-management',
    templateUrl: './pond-management.component.html',
    styleUrls: ['./pond-management.component.scss']
})
export class PondManagementComponent implements OnInit {
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
        private router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
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

    openDialogAddRole(pondId: number): void {
        const dialogRef = this.dialog.open(DialogAddRole, {
            width: '260px',
            data: { pondId }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.reloadPond();
        });
    }


    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }
}
