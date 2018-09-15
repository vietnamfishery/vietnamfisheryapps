import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {
  firstToggle: boolean;

  constructor() { }

  ngOnInit() {
  }
  
  onFormSubmit() {
    alert(`You submitted the form.`);
  }
}
