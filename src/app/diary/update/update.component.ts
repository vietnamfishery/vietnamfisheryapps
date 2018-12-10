import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryService } from '../diary.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/app/constants/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
    pondDiaryUUId: string;
    form: FormGroup;
    token: string;
    constructor(
        private appService: AppService,
        public snackBar: MatSnackBar,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private diaryService: DiaryService
    ) {
        this.token = this.appService.getCookie(tokenName);
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: any) => {
                this.pondDiaryUUId = params.get('pondDiaryUUId');
                return this.diaryService.getDiaryByDiaryUUId({
                    pondDiaryUUId: this.pondDiaryUUId
                }, this.token);
            })).subscribe(res => {
                // console.log(res);
                if (res.success) {
                    this.form.patchValue(res.pondDiary);
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
            });
        this.createForm();
    }

    createForm = () => {
        this.form = this.fb.group({
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

    onSubmit() {
        this.form.value[`pondDiaryUUId`] = this.pondDiaryUUId;
        if (this.checkForm(this.form.controls.fisheryQuantity.value, this.form.controls.pondVolume.value, this.form.controls.diedFishery.value)) { 
            this.diaryService.updateDiaryByUUId(this.form.value, this.token).subscribe(res => {
                if(res.success) {
                    this.form.disable();
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                    this.router.navigate(['/nhat-ky'])
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
}
