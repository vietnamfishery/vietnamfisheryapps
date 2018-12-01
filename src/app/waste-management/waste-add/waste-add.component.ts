import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tokenName } from 'src/app/constants/constant';
import { AppService } from 'src/app/app.service';
import * as jwtDecode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { WasteManagementService } from '../waste-management.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-waste-add',
    templateUrl: './waste-add.component.html',
    styleUrls: ['./waste-add.component.scss']
})
export class WasteAddComponent implements OnInit {

    public form: FormGroup;
    token: string;
    ownerId: number;
    pondUUId: string;
    pond: any;
    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
        private pondManagementService: PondManagementService,
        public snackBar: MatSnackBar,
        private wasteManagementService: WasteManagementService,
        private fb: FormBuilder
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
    }

    ngOnInit() {
        this.route.paramMap.pipe(
        switchMap(params => {
            this.pondUUId = params.get('pondUUId');
            return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
        })).subscribe(res => {
            this.pond = res.pond
        });
        this.createForm();
    }

    createForm = () => {
        this.form = this.fb.group({
            pondId: [null],
            ownerId: [this.ownerId],
            card: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
            solutions: [null, Validators.compose([])],
            employee: [null, Validators.compose([])]
        });
    }

    onSubmit() {
        this.form.patchValue({
            pondId: this.pond.pondId
        });
        this.wasteManagementService.addWaste(this.form.value, this.token).subscribe(res => {
            if (res.success) {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "right"
                });
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
