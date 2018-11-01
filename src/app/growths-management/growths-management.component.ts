import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GrowthsManagementService } from './growths-management.service';
import { MatSnackBar } from '@angular/material';
import { tokenName } from '../../environments';
import * as moment from 'moment';

@Component({
  selector: 'app-growths-management',
  templateUrl: './growths-management.component.html',
  styleUrls: ['./growths-management.component.scss']
})
export class GrowthsManagementComponent implements OnInit {
  stacked = false;
  growth: any[] = [];
  preloader: boolean = false;

  constructor(
    private appService: AppService,
    private growthsManagementService: GrowthsManagementService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.preloader = !this.preloader;
    const token: string = this.appService.getCookie(tokenName);
    this.growthsManagementService.getGrowth(token).subscribe((res) => {
      if(res.success) {
        this.growth = res.growths.map((element: any) => {
          return {
            growthId: element.growthId,
            averageDensity: element.averageDensity,
            averageMass: element.averageMass,
            speedOdGrowth: element.speedOdGrowth,
            livingRatio: element.livingRatio,
            createdDate: moment(element.createdDate).format(`DD - MM - YYYY`),
            seasonAndPond: element.seasonAndPond,
            pondId: element.seasonAndPond.pondId,
            seasonId: element.seasonAndPond.seasonId,
            seasonAndPondId: element.seasonAndPond.seasonAndPondId
          }
        });
      }else {
        this.snackBar.open(res.message, 'Đóng', {
          duration: 2500,
          horizontalPosition: "right"
        });
      }
      this.preloader = !this.preloader;
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

}
