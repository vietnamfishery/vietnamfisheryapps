import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tokenName } from '../../constants/constant';
import { AppService } from 'src/app/app.service';
import * as jwtDecode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
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
    selected: any = {};
    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
        private pondManagementService: PondManagementService,
        public snackBar: MatSnackBar,
        private wasteManagementService: WasteManagementService,
        private fb: FormBuilder,
        private router: Router
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

    checkForm(sl) {
        const reg = new RegExp(/^[0-9]+$/);
        if (!reg.test(sl)) {
            this.snackBar.open('Giá trị nhập phải là số và không âm, vui lòng kiểm tra lại!', 'Đóng', {
                duration: 2500,
                horizontalPosition: "center",
                verticalPosition: 'top'
            });
            return false;
        }
        return true;
    }

    onSubmit() {
        this.form.patchValue({
            pondId: this.pond.pondId
        });
        if (this.checkForm(this.form.controls.quantity.value)) {
            this.wasteManagementService.addWaste(this.form.value, this.token).subscribe(res => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                    setTimeout(() => {
                        this.form.reset();
                        this.router.navigate(['quan-ly-chat-thai']);
                    }, 500);
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
}
