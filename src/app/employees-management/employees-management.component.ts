import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PeriodicElement } from '../models/PeriodicElement';
import { ELEMENT_DATA } from '../constants/table-data';
import { EmployeesManagementService } from './employees-management.service';
import { AppService } from '../app.service';
import { tokenName } from '../../environments';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.scss']
})
export class EmployeesManagementComponent implements OnInit {
  token: any;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeesManagementService: EmployeesManagementService,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.token = this.appService.getCookie(tokenName);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
