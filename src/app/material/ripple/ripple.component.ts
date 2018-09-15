import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss']
})
export class RippleComponent implements OnInit {
  @ViewChild(MatRipple) ripple: MatRipple;

  centered = false;
  disabled = false;
  unbounded = false;
  rounded = false;
  radius: number;
  rippleSpeed = 1;
  rippleColor = '';

  disableButtonRipples = false;
  
  constructor() { }

  ngOnInit() {
  }

  launchRipple(persistent = false) {
    if (this.ripple) {
      this.ripple.launch(0, 0, { centered: true, persistent });
    }
  }

  fadeOutAll() {
    if (this.ripple) {
      this.ripple.fadeOutAll();
    }
  }
}
