import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Dir } from '@angular/cdk/bidi';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  message = 'Snack Bar opened.';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 10000;
  addExtraClass = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(public snackBar: MatSnackBar, private dir: Dir) { }

  ngOnInit() {
  }

  open() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = this.addExtraClass ? ['party'] : undefined;
    config.direction = this.dir.value;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }
}
