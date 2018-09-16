import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-add-pond',
  templateUrl: './add-pond.component.html',
  styleUrls: ['./add-pond.component.scss']
})
export class AddPondComponent implements OnInit {

  public form: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      // fname: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])]
    });
  }

}
