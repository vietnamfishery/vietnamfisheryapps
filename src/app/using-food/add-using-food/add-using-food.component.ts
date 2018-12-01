import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { UsingFoodService } from '../using-food.service';
import { tokenName } from '../../constants/constant';
import * as jwtDecode from 'jwt-decode';
import { switchMap } from 'rxjs/operators';
import { StorageManagementService } from 'src/app/storage-management/storage-management.service';

@Component({
    selector: 'app-add-using-food',
    templateUrl: './add-using-food.component.html',
    styleUrls: ['./add-using-food.component.scss']
})
export class AddUsingFoodComponent implements OnInit {

    preloader: boolean = false;
    token: string;
    ownerId: number;
    pondUUId: string;
    pond: any;
    form: FormGroup;
    storages: any;
    type: number = 0;
    selected: any = {};

    constructor(
        private appService: AppService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private pondManagementService: PondManagementService,
        private storageManagementService: StorageManagementService,
        private usingFoodService: UsingFoodService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.init();
        this.getFood();
        this.createForm();
    }

    createForm = () => {
        this.form = this.fb.group({
            pondId: [null],
            ownerId: [this.ownerId],
            takeCareName: [null, Validators.compose([Validators.required])],
            massOfFishery: [null, Validators.compose([Validators.required])],
            feedingRate: [null, Validators.compose([Validators.required])],
            storageId: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
        });
    }

    init() {
        this.route.paramMap.pipe(
        switchMap(params => {
            this.pondUUId = params.get('pondUUId');
            return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
        })).subscribe(res => {
            if(res.success){
                this.pond = res.pond
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        });
    }

    getFood = () => {
        this.storageManagementService.getStorageWithUser(this.token, this.type).subscribe(res => {
            if(res.success){
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

    onSubmit() {
        this.form.patchValue({
            pondId: this.pond.pondId
        })
        this.usingFoodService.addUsingFood(this.form.value, this.token).subscribe(res => {
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

    cancel() {
        this.form.reset();
        this.router.navigate(['/cho-an'])
    }
}
