import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonDataSource } from '../person-data-source';
import { PersonDetailDataSource, DetailRow } from '../person-detail-data-source';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserData, TablePagesService } from '../table-pages.service';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export type UserProperties = 'userId' | 'userName' | 'progress' | 'color' | undefined;

export type TrackByStrategy = 'id' | 'reference' | 'index';

const properties = ['id', 'name', 'progress', 'color'];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource: PersonDataSource | null;
  dataSourceWithDetails: PersonDetailDataSource | null;
  matTableDataSource = new MatTableDataSource<UserData>();
  displayedColumns: UserProperties[] = [];
  trackByStrategy: TrackByStrategy = 'reference';
  changeReferences = false;
  progressSortingDisabled = false;
  highlights = new Set<string>();
  wasExpanded = new Set<UserData>();

  matTableDataSourceColumns = ['select', 'userId', 'userName', 'progress', 'color'];
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginatorForDataSource') paginatorForDataSource: MatPaginator;
  @ViewChild('sortForDataSource') sortForDataSource: MatSort;

  dynamicColumnDefs: any[] = [];
  dynamicColumnIds: string[] = [];

  expandedPerson: UserData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isDetailRow = (_index: number, row: DetailRow|UserData) => row.hasOwnProperty('detailRow');

  constructor(public _peopleDatabase: TablePagesService) {
    this.matTableDataSource.sortingDataAccessor = (data: UserData, property: string) => {
      switch (property) {
        case 'userId': return +data.id;
        case 'userName': return data.name;
        case 'progress': return +data.progress;
        case 'color': return data.color;
        default: return '';
      }
    };
    this.matTableDataSource.filterPredicate =
        (data: UserData, filter: string) => data.name.indexOf(filter) !== -1;
  }

  ngAfterViewInit() {
    // Needs to be set up after the view is initialized since the data source will look at the sort
    // and paginator's initial values to know what data should be rendered.
    this.matTableDataSource.paginator = this.paginatorForDataSource;
    this.matTableDataSource.sort = this.sortForDataSource;
  }

  ngOnInit() {
    this.connect();
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(() => {
        this.paginatorForDataSource.pageIndex = 0;
        this.matTableDataSource.filter = this.filter.nativeElement.value;
      });
  }

  /** Whether all filtered rows are selected. */
  isAllFilteredRowsSelected() {
    return this.matTableDataSource.filteredData.every(data => this.selection.isSelected(data));
  }

  /** Whether the selection it totally matches the filtered rows. */
  isMasterToggleChecked() {
    return this.selection.hasValue() &&
        this.isAllFilteredRowsSelected() &&
        this.selection.selected.length >= this.matTableDataSource.filteredData.length;
  }

  /**
   * Whether there is a selection that doesn't capture all the
   * filtered rows there are no filtered rows displayed.
   */
  isMasterToggleIndeterminate() {
    return this.selection.hasValue() &&
        (!this.isAllFilteredRowsSelected() || !this.matTableDataSource.filteredData.length);
  }

  /** Selects all filtered rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isMasterToggleChecked()) {
      this.selection.clear();
    } else {
      this.matTableDataSource.filteredData.forEach(data => this.selection.select(data));
    }
  }

  addDynamicColumnDef() {
    const nextProperty = properties[this.dynamicColumnDefs.length];
    this.dynamicColumnDefs.push({
      id: nextProperty.toUpperCase(),
      property: nextProperty,
      headerText: nextProperty
    });

    this.dynamicColumnIds = this.dynamicColumnDefs.map(columnDef => columnDef.id);
  }

  removeDynamicColumnDef() {
    this.dynamicColumnDefs.pop();
    this.dynamicColumnIds.pop();
  }

  connect() {
    this.displayedColumns = ['userId', 'userName', 'progress', 'color'];
    this.dataSource = new PersonDataSource(this._peopleDatabase,
        this.paginator, this.sort);
    this.dataSourceWithDetails = new PersonDetailDataSource(this.dataSource);
    this._peopleDatabase.initialize();
    this.matTableDataSource.data = this._peopleDatabase.data.slice();
  }

  disconnect() {
    this.dataSource = null;
    this.displayedColumns = [];
  }

  getOpacity(progress: number) {
    const distanceFromMiddle = Math.abs(50 - progress);
    return distanceFromMiddle / 50 + .3;
  }

  userTrackBy = (index: number, item: UserData) => {
    switch (this.trackByStrategy) {
      case 'id': return item.id;
      case 'reference': return item;
      case 'index': return index;
    }
  }

  toggleColorColumn() {
    const colorColumnIndex = this.displayedColumns.indexOf('color');
    if (colorColumnIndex === -1) {
      this.displayedColumns.push('color');
    } else {
      this.displayedColumns.splice(colorColumnIndex, 1);
    }
  }

  toggleHighlight(property: string, enable: boolean) {
    enable ? this.highlights.add(property) : this.highlights.delete(property);
  }
}
