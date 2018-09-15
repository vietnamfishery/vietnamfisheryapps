import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Output() shiftColumns = new EventEmitter<void>();
  @Output() toggleColorColumn = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }

}
