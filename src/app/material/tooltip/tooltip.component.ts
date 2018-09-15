import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TooltipPosition } from '@angular/material';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  position: TooltipPosition = 'below';
  message = 'Here is the tooltip';
  tooltips: string[] = [];
  disabled = false;
  showDelay = 0;
  hideDelay = 1000;
  showExtraClass = false;
  
  constructor() { }

  ngOnInit() {
  }

}
