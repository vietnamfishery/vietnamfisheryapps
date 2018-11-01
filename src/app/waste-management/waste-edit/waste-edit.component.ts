import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cards } from '../../constants/card-select-data';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { WasteManagementService } from '../waste-management.service';
import { Observable } from 'rxjs';
import { tokenName } from '../../../environments';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-waste-edit',
  templateUrl: './waste-edit.component.html',
  styleUrls: ['./waste-edit.component.scss']
})
export class WasteEditComponent implements OnInit {

  public form: FormGroup;
  cards = cards;
  diedFishery: Observable<any>;
  diedFisheryId: any;
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
    this.form = this.fb.group({
      diedFisheryId: [null],
      card: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      solutions: [null, Validators.compose([])],
      employee: [null, Validators.compose([])]
    });
    this.diedFishery = this.route.paramMap.pipe(
      switchMap(params => {
        this.diedFisheryId = params.get('diedFisheryId');
        return this.wasteManagementService.getWasteById(this.diedFisheryId, this.token);
      })
    )
    this.diedFishery.subscribe();
    this.wasteManagementService.getWasteById(this.diedFisheryId, this.token).subscribe((val) => {
      const diedFishery = val.diedFishery;
      this.form.patchValue({
        card: diedFishery.card,
        quantity: diedFishery.quantity,
        solutions: diedFishery.solutions,
        employee: diedFishery.employee
      });
    });
  }

  onSubmit() {
    this.form.patchValue({
      diedFisheryId: this.diedFisheryId
    });
    this.wasteManagementService.updateWaste(this.form.value, this.token).subscribe((res) => {
      if (res.success) {
        this.snackBar.open(res.message, 'Đóng', {
          duration: 3000,
          horizontalPosition: "right"
          // verticalPosition: 'top'
        });
        this.router.navigate(['/quan-ly-chat-thai']);
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
