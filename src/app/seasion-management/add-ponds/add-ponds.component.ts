import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../../models/PeriodicElement';
import { ELEMENT_DATA } from '../../constants/table-data';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { SeasionManagementService } from '../seasion-management.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tokenName } from '../../../environments';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeesManagementService } from '../../employees-management/employees-management.service';

@Component({
  selector: 'app-add-ponds',
  templateUrl: './add-ponds.component.html',
  styleUrls: ['./add-ponds.component.scss']
})
export class AddPondsComponent implements OnInit {
  season: Observable<any>;
  seasonUUId: any;
  token: string;
  seasonName: string;

  displayedColumns: string[] = ['check', 'pondName', 'pondArea', 'pondDepth', 'createdCost', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private seasionManagementService: SeasionManagementService,
    private employeesManagementService: EmployeesManagementService
  ) {
    this.token = this.appService.getCookie(tokenName);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.season = this.route.paramMap.pipe(
      switchMap(params => {
        this.seasonUUId = params.get('seasonUUId');
        return this.seasionManagementService.getPondBySeason(this.seasonUUId, this.token);
      })
    );
    this.season.subscribe(res => {
        console.log(res);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
