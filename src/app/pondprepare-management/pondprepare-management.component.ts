import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pondprepare-management',
  templateUrl: './pondprepare-management.component.html',
  styleUrls: ['./pondprepare-management.component.scss']
})
export class PondprepareManagementComponent implements OnInit {

  ponds: any[] = [];
  num = 1;

  constructor() {
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
        'Chuẩn bị đợt 1',
        'Chuẩn bị đợt 2',
        'Chuẩn bị đợt 3',
        'Chuẩn bị đợt 4',
        'Chuẩn bị đợt 5',
        'Chuẩn bị đợt 6',
        'Chuẩn bị đợt 7',
        'Chuẩn bị đợt 8'][Math.floor(Math.random() * 8)],

    });
  }

  ngOnInit() {
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  panelOpenState = false;

}
