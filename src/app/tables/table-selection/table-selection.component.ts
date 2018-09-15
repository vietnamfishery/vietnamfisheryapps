import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.scss']
})
export class TableSelectionComponent implements OnInit {

  rows: any[] = [];
  selected: any[] = [];
  columns: any[] = [
    { prop: 'name'},
    { name: 'Company' },
    { name: 'Gender' }
  ];

  constructor() { 
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }

  onActivate(event) {
    console.log('Event: activate', event);
  }

  ngOnInit() {
  }

}
