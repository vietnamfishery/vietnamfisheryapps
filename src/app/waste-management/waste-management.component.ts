import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-waste-management',
  templateUrl: './waste-management.component.html',
  styleUrls: ['./waste-management.component.scss']
})
export class WasteManagementComponent implements OnInit {

  panelOpenState = false;

  constructor() {
    
  }
  
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
  ngOnInit() {}

}
