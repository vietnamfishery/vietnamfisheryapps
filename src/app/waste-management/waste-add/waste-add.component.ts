import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-waste-add',
  templateUrl: './waste-add.component.html',
  styleUrls: ['./waste-add.component.scss']
})
export class WasteAddComponent implements OnInit {

  public form: FormGroup;
  // editing = {};
  // rows = [];
  
  constructor(private fb: FormBuilder) { 
    // this.fetch((data) => {
    //   this.rows = data;
    // });
  }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/data/company.json`);

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }

  // updateValue(event, cell, cellValue, row) {
  //   this.editing[row.$$index + '-' + cell] = false;
  //   this.rows[row.$$index][cell] = event.target.value;
  // }

  ngOnInit() {
    this.form = this.fb.group({
      pondName: [null, Validators.compose([Validators.required])],
      seasonName: [null, Validators.compose([Validators.required])],
      card: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      solutions: [null, Validators.compose([])],
      employee: [null, Validators.compose([])]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
