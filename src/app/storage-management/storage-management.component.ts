import { Component, OnInit } from '@angular/core';
import { foods } from '../contants/select-data';

@Component({
  selector: 'app-storage-management',
  templateUrl: './storage-management.component.html',
  styleUrls: ['./storage-management.component.scss']
})
export class StorageManagementComponent implements OnInit {
  foods = foods;
  selectedValue: string;

  constructor() { }

  ngOnInit() {
  }

}
