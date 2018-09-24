import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-stocking',
  templateUrl: './add-stocking.component.html',
  styleUrls: ['./add-stocking.component.scss']
})
export class AddStockingComponent implements OnInit {
  
  myControl = new FormControl();
  options: string[] = ['Tôm sú', 'Tôm càng xanh', 'Cua'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
