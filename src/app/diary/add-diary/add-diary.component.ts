import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { DiaryService } from '../diary.service';
import { MatSnackBar } from '@angular/material';
import * as jwtDecode from 'jwt-decode';
import { tokenName } from '../../constants/constant';

@Component({
    selector: 'app-add-diary',
    templateUrl: './add-diary.component.html',
    styleUrls: ['./add-diary.component.scss']
})
export class AddDiaryComponent implements OnInit {
    isLinear = true;
    form: FormGroup;
    token: string;
    ownerId: number;
    pondUUId: string;
    pond: any;
    constructor(
        private appService: AppService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private pondManagementService: PondManagementService,
        private diaryService: DiaryService
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
            diaryName: [null, Validators.compose([Validators.required])],
            fisheryQuantity: [null, Validators.compose([Validators.required])],
            healthOfFishery: [null, Validators.compose([Validators.required])],
            pondVolume: [null, Validators.compose([Validators.required])],
            diedFishery: [null, Validators.compose([Validators.required])],
            notes: [null]
        })
    }

    checkForm(slhtut, tta, stc) {
        const reg = new RegExp(/^\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/);
        if (!reg.test(slhtut) || !reg.test(tta) || !reg.test(stc)) {
            this.snackBar.open('Giá trị nhập phải là số và không âm, vui lòng kiểm tra lại!', 'Đóng', {
                duration: 2500,
                horizontalPosition: "center",
                verticalPosition: 'top'
            });
            return false;
        }
        return true;
    }

    onSubmit = () => {
        this.form.patchValue({
            pondId: this.pond.pondId
        });
        if (this.checkForm(this.form.controls.fisheryQuantity.value, this.form.controls.pondVolume.value, this.form.controls.diedFishery.value)) { 
            this.diaryService.addDiary(this.form.value, this.token).subscribe(res => {
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
            });
        }
    }
    
    cancel() {
        this.router.navigate(['/nhat-ky']);
    }
}
