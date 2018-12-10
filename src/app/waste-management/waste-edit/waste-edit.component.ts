import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cards } from '../../constants/card-select-data';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { WasteManagementService } from '../waste-management.service';
import { Observable } from 'rxjs';
import { tokenName } from 'src/app/constants/constant';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-waste-edit',
    templateUrl: './waste-edit.component.html',
    styleUrls: ['./waste-edit.component.scss']
})
export class WasteEditComponent implements OnInit {

    public form: FormGroup;
    cards = cards;
    diedFishery: any = {};
    diedFisheryUUId: any;
    token: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private router: Router,
        private appService: AppService,
        private wasteManagementService: WasteManagementService,
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.createForm();
        this.diedFishery = this.route.paramMap.pipe(
            switchMap(params => {
                this.diedFisheryUUId = params.get('diedFisheryUUId');
                return this.wasteManagementService.getWasteByWasteUUId({
                    diedFisheryUUId: this.diedFisheryUUId
                }, this.token)
            })
        ).subscribe(res => {
            if (res.success) {
                res.waste['card'] = res.waste['card'] - 0;
                this.form.patchValue({
                    ...res.waste
                })
            } else {
                this.snackBar.open(res.message, 'Đóng', {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: 'top'
                });
            }
        })
    }

    createForm() {
        this.form = this.fb.group({
            diedFisheryUUId: [this.diedFisheryUUId],
            card: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required])],
            solutions: [null, Validators.compose([])],
            employee: [null, Validators.compose([])]
        });
    }

    checkForm(sl) {
        const reg = new RegExp(/^[0-9]+$/);
        if (!reg.test(sl)) {
            this.snackBar.open('Giá trị nhập phải là số thực và không âm, vui lòng kiểm tra lại!', 'Đóng', {
                duration: 2500,
                horizontalPosition: "center",
                verticalPosition: 'top'
            });
            return false;
        }
        return true;
    }

    onSubmit() {
        if (this.checkForm(this.form.controls.quantity.value)) {
            this.wasteManagementService.updateWaste(this.form.value, this.token).subscribe((res) => {
                if (res.success) {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "right"
                    });
                    this.router.navigate(['/quan-ly-chat-thai']);
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 2500,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                    this.form.reset();
                }
            });
        }
    }

}
