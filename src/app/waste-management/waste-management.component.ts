import { Component, OnInit } from '@angular/core';
import { WasteManagementService } from './waste-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-waste-management',
  templateUrl: './waste-management.component.html',
  styleUrls: ['./waste-management.component.scss']
})
export class WasteManagementComponent implements OnInit {

  panelOpenState = false;
  waste: any[] = [];
  preloader: boolean = false;

  constructor(
    private appService: AppService,
    private wasteManagementService: WasteManagementService,
    public snackBar: MatSnackBar
  ) {
    
  }
  
  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
  ngOnInit() {
    this.preloader = !this.preloader;
    const token: string = this.appService.getCookie(tokenName);
    this.wasteManagementService.getWasteAll(token).subscribe((res) => {
      if(res.success) {
        this.waste = res.diedFishery.map((element: any) => {
          return {
            diedFisheryId: element.diedFisheryId,
            card: element.card,
            createdDate: moment(element.createdDate).format(`DD - MM - YYYY`),
            employee: element.employee,
            quantity: element.quantity,
            solutions: element.solutions,
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

}
