import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-pond-management',
  templateUrl: './pond-management.component.html',
  styleUrls: ['./pond-management.component.scss']
})
export class PondManagementComponent implements OnInit {
  ponds: any[] = [];
  num = 1;

  animal: string;
  name: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {
    for (this.num; this.num <= 15; this.num += 1) {
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
        'Ao số 1',
        'Ao số 2',
        'Ao số 3',
        'Ao số 4',
        'Ao số 5',
        'Ao số 6',
        'Ao số 7',
        'Ao số 8'][Math.floor(Math.random() * 8)]
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DialogAddPond, {
      width: '260px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-add-pond',
  templateUrl: './dialog-add-pond.html',
})
export class DialogAddPond {
  constructor(
    public dialogRef: MatDialogRef<DialogAddPond>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
