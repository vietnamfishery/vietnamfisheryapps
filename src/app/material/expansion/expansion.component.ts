import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent implements OnInit {
  displayMode = 'default';
  multi = false;
  hideToggle = false;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;
  
  constructor() { }

  ngOnInit() {
  }

}
