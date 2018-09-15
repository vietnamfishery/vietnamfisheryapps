import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  invert = false;

  constructor() { }

  ngOnInit() {
  }

}
