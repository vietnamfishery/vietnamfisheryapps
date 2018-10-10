import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PeriodicElement } from '../../diary/diary.component';
import { ELEMENT_DATA } from '../../contants/table-data';

@Component({
  selector: 'app-cost-pondprepare',
  templateUrl: './cost-pondprepare.component.html',
  styleUrls: ['./cost-pondprepare.component.scss']
})
export class CostPondprepareComponent implements OnInit {

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
