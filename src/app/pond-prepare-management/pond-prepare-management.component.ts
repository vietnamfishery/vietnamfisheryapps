import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pond-prepare-management',
  templateUrl: './pond-prepare-management.component.html',
  styleUrls: ['./pond-prepare-management.component.scss']
})
export class PondPrepareManagementComponent implements OnInit {
  invoiceItems: any = [
    {
      no: 1,
      pondName: 'Ao số 1',
      pondArea: 30,
      pondDept: 3,
      status: "Đang nuôi",
      time: "20/09/2017",
      timeout: 10,
      price: 15000000
    },
    {
      no: 2,
      pondName: 'Ao số 2',
      pondArea: 32,
      pondDept: 3.2,
      status: "Trống",
      time: "20/09/2017",
      timeout: 11,
      price: 16000000
    },
    {
      no: 3,
      pondName: 'Ao số 3',
      pondArea: 25,
      pondDept: 2.2,
      status: "Đang nuôi",
      time: "20/09/2017",
      timeout: 11,
      price: 13000000
    },
    {
      no: 4,
      pondName: 'Ao số 4',
      pondArea: 45,
      pondDept: 4.0,
      status: "Đang nuôi",
      time: "20/09/2017",
      timeout: 15,
      price: 18000000
    },
    {
      no: 5,
      pondName: 'Ao số 5',
      pondArea: 28,
      pondDept: 3.2,
      status: "Trống",
      time: "20/09/2017",
      timeout: 10,
      price: 16000000
    },
  ];

  invoiceTotals: any = [{
    'subtotal': this.getSubTotal(),
    'tax': this.getCalculatedTax(),
    'discount': 0.00,
    'total': 0
  }];

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  constructor() { }

  ngOnInit() {
  }

  getSubTotal() {
    let total = 0.00;
    for (let i = 1; i < this.invoiceItems.length; i++) {
      total += (this.invoiceItems[i].price);
    }
    return total;
  }

  getCalculatedTax() {
    return ((15 * this.getSubTotal()) / 100);
  }

  getTotal() {
    return (this.getSubTotal() + this.getCalculatedTax());
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }
}
