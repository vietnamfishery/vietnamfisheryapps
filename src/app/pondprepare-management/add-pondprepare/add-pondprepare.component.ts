import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-pondprepare',
  templateUrl: './add-pondprepare.component.html',
  styleUrls: ['./add-pondprepare.component.scss']
})
export class AddPondprepareComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      pond: [null, Validators.compose([Validators.required])],
      season: [null, Validators.compose([Validators.required])],
      pondprepareName: [null, Validators.compose([Validators.required])],
      materialname: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      dateprepare: [null, Validators.compose([Validators.required])],
    });
  }

}
