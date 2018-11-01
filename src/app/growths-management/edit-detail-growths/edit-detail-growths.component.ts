import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { GrowthsManagementService } from '../growths-management.service';
import { switchMap } from 'rxjs/operators';
import { tokenName } from '../../../environments';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-detail-growths',
  templateUrl: './edit-detail-growths.component.html',
  styleUrls: ['./edit-detail-growths.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
})
export class EditDetailGrowthsComponent implements OnInit {

  public form: FormGroup;
  growth: Observable<any>;
  growthId: any;
  token: string;

  constructor(
    private adapter: DateAdapter<any>,
    private fb: FormBuilder,
    private appService: AppService,
    private growthsManagementService: GrowthsManagementService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.token = this.appService.getCookie(tokenName);
  }

  ngOnInit() {
    this.form = this.fb.group({
      // pondName: [null, Validators.compose([Validators.required])],
      // seasonName: [null, Validators.compose([Validators.required])],
      growthId: [null],
      averageDensity: [null, Validators.compose([Validators.required])],
      averageMass: [null, Validators.compose([Validators.required])],
      speedOdGrowth: [null, Validators.compose([Validators.required])],
      livingRatio: [null, Validators.compose([Validators.required])]
    });

    this.growth = this.route.paramMap.pipe(
      switchMap(params => {
        this.growthId = params.get('growthId');
        return this.growthsManagementService.getGrowthById(this.growthId, this.token);
      })
    )
    this.growth.subscribe();
    this.growthsManagementService.getGrowthById(this.growthId, this.token).subscribe((val) => {
      const growth = val.growth;
      this.form.patchValue({
        averageDensity: growth.averageDensity,
        averageMass: growth.averageMass,
        speedOdGrowth: growth.speedOdGrowth,
        livingRatio: growth.livingRatio
      });
    });
  }

  vietnamese() {
    this.adapter.setLocale('vi');
  }

  onSubmit() {
    this.form.patchValue({
      growthId: this.growthId
    });
    console.log(this.form.value);
    this.growthsManagementService.updateGrowth(this.form.value, this.token).subscribe((res) => {
      if (res.success) {
        this.snackBar.open(res.message, 'Đóng', {
          duration: 3000,
          horizontalPosition: "right"
        });
        this.router.navigate(['/quan-ly-tang-truong']);
      } else {
        this.snackBar.open(res.message, 'Đóng', {
          duration: 2500,
          horizontalPosition: "right"
        });
        this.form.reset();
      }
    });
  }
}
