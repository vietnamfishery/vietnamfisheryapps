import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-stocking',
  templateUrl: './edit-stocking.component.html',
  styleUrls: ['./edit-stocking.component.scss']
})
export class EditStockingComponent implements OnInit {

  
  myControl = new FormControl();
  options: string[] = ['Tôm sú', 'Tôm càng xanh', 'Cua'];
  filteredOptions: Observable<string[]>;
  
  constructor() { 
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
