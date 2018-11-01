import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PeriodicElement } from '../../models/PeriodicElement';
import { ELEMENT_DATA } from '../../constants/table-data';

@Component({
  selector: 'app-veterinary-management',
  templateUrl: './veterinary-management.component.html',
  styleUrls: ['./veterinary-management.component.scss']
})
export class VeterinaryManagementComponent implements OnInit {
  type: string = 'thuoc-va-duoc-pham';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor() {
    window.sessionStorage.setItem('typeStorage', 'veterinaries');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
