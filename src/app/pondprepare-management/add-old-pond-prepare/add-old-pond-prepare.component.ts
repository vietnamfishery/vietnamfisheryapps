import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/environments';
import * as jwtDecode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageManagementService } from 'src/app/storage-management/storage-management.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PondprepareManagementService } from '../pondprepare-management.service';

export interface Choose {
    productName: string;
    quantity: number;
}

@Component({
    selector: 'app-add-old-pond-prepare',
    templateUrl: './add-old-pond-prepare.component.html',
    styleUrls: ['./add-old-pond-prepare.component.scss']
})
export class AddOldPondPrepareComponent implements OnInit {

    token: string;
    ownerId: number;
    type: number = 1;
    pond: any;
    form: FormGroup;
    detailsOfPrepare: any[] = [];
    showDetailsOfPrepare: any[] = [];
    displayedColumns: string[] = ['productName', 'quantity'];
    dataSource = new MatTableDataSource<Choose>(this.showDetailsOfPrepare);
    storages: any[] = [];
    pondUUId: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public snackBar: MatSnackBar,
        private pondManagementService: PondManagementService,
        private pondprepareManagementService: PondprepareManagementService,
        private appService: AppService,
        private storageManagementService: StorageManagementService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.getPond(); // get pond xong moi get storage - ham getPond goi ham getStorage
        this.createForm();
    }

    getStorage() {
        this.storageManagementService.getStorageWithUser(this.token, this.type).subscribe(res => {
            if (res.success) {
                this.storages = res.storages;
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        });
    }

    getPond = () => {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.pondUUId = params.get('pondUUId');
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })).subscribe(res => {
                if (res.success) {
                    this.pond = res.pond;
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
                this.getStorage();
            });
    }

    createForm = () => {
        this.form = this.fb.group({
            pondId: [null],
            ownerId: [this.ownerId],
            pondPrepareName: [null, Validators.compose([Validators.required])],
            storage: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
        });
    }

    addArray() {
        const obj: object = {
            storageId: this.form.value.storage.storageId,
            quantity: this.form.value.quantity
        }
        this.detailsOfPrepare.push(obj);
        this.showDetail();
    }

    showDetail() {
        const obj: object = {
            productName: this.form.value.storage.productName,
            quantity: this.form.value.quantity
        }
        this.showDetailsOfPrepare.push(obj);
        this.dataSource.data = this.showDetailsOfPrepare;
    }

    reChoose() {
        this.detailsOfPrepare = [];
        this.showDetailsOfPrepare = [];
        this.dataSource.data = []
    }

    cancel() {
        this.form.reset();
        this.router.navigate(['/quan-ly-chuan-bi-ao'])
    }

    onSubmit = () => {
        this.form.patchValue({
            pondId: this.pond.pondId
        })
        let obj: object = {
            ...this.form.value,
            detailsOfPrepare: this.detailsOfPrepare,
            ownerId: this.ownerId
        }
        this.pondprepareManagementService.addPrepareOldPond(this.token, obj).subscribe(res => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "right"
                });
                this.cancel();
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }
}
