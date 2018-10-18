import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { DialogData } from '../pond-management/pond-management.component';

@Component({
  selector: 'app-harvest-management',
  templateUrl: './harvest-management.component.html',
  styleUrls: ['./harvest-management.component.scss']
})
export class HarvestManagementComponent implements OnInit {

  ponds: any[] = [];
  num = 1;

  animal: string;
  name: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { 
    for (this.num; this.num <= 2; this.num += 1) {
      this.addProducts(this.num);
    }
  }

  addProducts(i) {
    this.ponds.push({
      id: i,
      price: (Math.random() * (0 - 10) + 10).toFixed(0),
      status: ['', '', '', 'empty'][Math.floor(Math.random() * 4)],
      discount: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
      name: [
        'Thu hoạch đợt 1',
        'Thu hoạch đợt 2',
        'Thu hoạch đợt 3',
        'Thu hoạch đợt 4',
        'Thu hoạch đợt 5',
        'Thu hoạch đợt 6',
        'Thu hoạch đợt 7',
        'Thu hoạch đợt 8'][Math.floor(Math.random() * 8)]
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  openDialogAddHarvest(): void {
    const dialogRef = this.dialog.open(DialogAddHarvest, {
      width: '260px',
      data: { name: this.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-add-harvest',
  templateUrl: './dialog-add-harvest.html',
})
export class DialogAddHarvest {
  constructor(
    public dialogRef: MatDialogRef<DialogAddHarvest>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

