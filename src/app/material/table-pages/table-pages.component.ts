import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-pages',
  templateUrl: './table-pages.component.html',
  styleUrls: ['./table-pages.component.scss']
})
export class TablePagesComponent implements OnInit {
  links = [
    {name: 'Main Page', link: 'main-demo'},
    {name: 'Custom Table', link: 'custom-table'},
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
