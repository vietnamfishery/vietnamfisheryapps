import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-growths-management',
  templateUrl: './growths-management.component.html',
  styleUrls: ['./growths-management.component.scss']
})
export class GrowthsManagementComponent implements OnInit {

  stacked = false;
  constructor() { }

  ngOnInit() {

  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

}
