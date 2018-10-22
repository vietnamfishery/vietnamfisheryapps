import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-waste-edit',
  templateUrl: './waste-edit.component.html',
  styleUrls: ['./waste-edit.component.scss']
})
export class WasteEditComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder) { }

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
