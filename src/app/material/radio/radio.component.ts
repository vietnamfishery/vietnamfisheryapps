import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  isAlignEnd = false;
  isDisabled = false;
  isRequired = false;
  favoriteSeason = 'Autumn';
  seasonOptions = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
