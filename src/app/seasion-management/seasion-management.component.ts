import { Component, OnInit, Inject, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ISeason } from '../models/season';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../constants/format-date';
import { SeasionManagementService } from './seasion-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../constants/constant';
import { DialogAddSeasion } from './dialog-add-seasion.component.';

export interface DialogData {
    animal: string;
    name: string;
}


@Component({
    selector: 'app-seasion-management',
    templateUrl: './seasion-management.component.html',
    styleUrls: ['./seasion-management.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class SeasionManagementComponent implements OnInit {
    ELEMENT_DATA: ISeason[] = []
    displayedColumns: string[] = ['seasonName', 'status', 'action'];
    dataSource = new MatTableDataSource<ISeason>(this.ELEMENT_DATA);
    color = 'accent';
    checked = false;
    disabled = false;
    isEdit = false;
    preloader: boolean = false;

    public form: FormGroup;
    seasonName: string;
    seasonStatus: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ContentChild('ssname') span: ElementRef;

    name: string;
    token: string;
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private adapter: DateAdapter<any>,
        private appService: AppService,
        private fb: FormBuilder,
        private seasionManagementService: SeasionManagementService,
        public snackBar: MatSnackBar
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.preloader = !this.preloader;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.creatForm();
        this.reloadTable();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    reloadTable = () => {
        this.seasionManagementService.getSeasonWithOwner(this.token).subscribe((res: any) => {
            if (res.success == true) {
                console.log(res)
                this.dataSource.data = res.seasons;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {

            }
            this.preloader = !this.preloader;
        });
    }

    creatForm = () => {
        this.form = this.fb.group({
            seasonId: [null],
            seasonName: [null, Validators.compose([Validators.required])],
            status: [null, Validators.compose([Validators.required])]
        });
    }



    openDialogAddSeasion(): void {
        const dialogRef = this.dialog.open(DialogAddSeasion, {
            width: '260px',
            data: { name: this.name }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.reloadTable()
        });
    }

    onSubmit(seasonId, seasonName) {
        const data = { seasonId, seasonName: seasonName.value }
        const token: string = this.appService.getCookie(tokenName);
        this.seasionManagementService.updateseason(data, token).subscribe((res) => {
            if (res.success) {
                this.seasionManagementService.getSeasonWithOwner(token).subscribe((res: any) => {
                    if (res.success == true) {
                        this.dataSource = res.seasons;
                    }
                });
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "right"
                });
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 2500,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            }
        })
    }

    cancel(span, form) {
        span.classList.remove('hidden');
        form.classList.add('hidden');
    }

    toEdit(span, form, seasonName) {
        this.seasonName = seasonName.value;
        span.classList.add('hidden');
        form.classList.remove('hidden');
    }
}

