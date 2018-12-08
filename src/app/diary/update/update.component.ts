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

    onSubmit() {
        this.form.value[`pondDiaryUUId`] = this.pondDiaryUUId;
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
        })
    }
}
