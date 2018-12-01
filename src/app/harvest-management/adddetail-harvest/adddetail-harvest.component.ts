import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../constants/constant';
import * as jwtDecode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { HarvestManagementService } from '../harvest-management.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-adddetail-harvest',
    templateUrl: './adddetail-harvest.component.html',
    styleUrls: ['./adddetail-harvest.component.scss']
})
export class AdddetailHarvestComponent implements OnInit {

    form: FormGroup;
    token: string;
    ownerId: number;
    pondUUId: string;
    pond: any;

    constructor(
        private appService: AppService,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private pondManagementService: PondManagementService,
        private harvestManagementService: HarvestManagementService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.getPond();
        this.createForm();
    }

    getPond() {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.pondUUId = params.get('pondUUId');
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })).subscribe(res => {
                this.pond = res.pond
            });
    }

    createForm() {
        this.form = this.fb.group({
            pondId: [null],
            ownerId: [this.ownerId],
            harvestName: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
            unitPrice: [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit() {
        this.form.patchValue({
            pondId: this.pond.pondId
        });
        this.harvestManagementService.addHarvest(this.form.value, this.token).subscribe(res => {
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
        this.router.navigate(['/quan-ly-thu-hoach']);
    }
}
