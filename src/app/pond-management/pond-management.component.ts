import { Component, OnInit, } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PondManagementService } from './pond-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import { imagePlaceHolder } from '../constants/constant';
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
    ownerId: number;

    animal: string;
    name: string;
    imgSource: string = '';
    preloader: boolean = false;
    token: string;
    isBoss: boolean;
    notOwner: boolean = false;
    imagePlaceHolder: string = imagePlaceHolder;
    constructor(
        private router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private pondManagementService: PondManagementService,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if(deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }
    
    ngOnInit() {
        this.reloadPond();
    }

    reloadPond = () => {
        this.preloader = !this.preloader;
        this.pondManagementService.getAllPond(this.token).subscribe((res: any) => {
            if (res.success) {
                if (res.ponds.length == 0) {
                    this.snackBar.open('Bạn chưa có ao nào trong hệ thống', 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "center",
                        verticalPosition: "top"
                    });
                }
                this.ponds = res.ponds;
                this.getImage();
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

    async getImage() {
        const arr = [];
        for(let p of this.ponds){
            p[`image`] = await this.appService.loadImage(p.images);
            arr.push(p);
        }
        this.ponds = arr;
    }
}
