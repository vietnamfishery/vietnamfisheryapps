import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../../models/PeriodicElement';
import { ELEMENT_DATA } from '../../constants/table-data';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { tokenName } from '../../../environments';
import { SeasionManagementService } from '../seasion-management.service';

@Component({
  selector: 'app-list-ponds',
  templateUrl: './list-ponds.component.html',
  styleUrls: ['./list-ponds.component.scss']
})
export class ListPondsComponent implements OnInit {
  season: Observable<any>;
  seasonId: any;
  token: string;
  seasonName: string;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private seasionManagementService: SeasionManagementService
  ) { 
    this.token = this.appService.getCookie(tokenName);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.season = this.route.paramMap.pipe(
      switchMap(params => {
        this.seasonId = params.get('seasonId');
        return this.seasionManagementService.getPondBySeason(this.seasonId, this.token);
      })
    );
    this.season.subscribe();
    this.seasionManagementService.getPondBySeason(this.seasonId, this.token).subscribe((res: any)=> {
      const seasonName = res.season.seasonName;
      this.seasonName = seasonName;
    });
  }

}
