import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adddetail-harvest',
  templateUrl: './adddetail-harvest.component.html',
  styleUrls: ['./adddetail-harvest.component.scss']
})
export class AdddetailHarvestComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      seasonName: [null, Validators.compose([Validators.required])],
      pondName: [null, Validators.compose([Validators.required])],
      harvestName: [null, Validators.compose([Validators.required])],
      breedName: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      unitPrice: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
