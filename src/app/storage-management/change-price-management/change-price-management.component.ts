import { Component, OnInit, ViewChild } from '@angular/core';

import { PeriodicElement } from '../../models/PeriodicElement';
import { ELEMENT_DATA } from '../../contants/table-data';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-change-price-management',
  templateUrl: './change-price-management.component.html',
  styleUrls: ['./change-price-management.component.scss']
})
export class ChangePriceManagementComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
