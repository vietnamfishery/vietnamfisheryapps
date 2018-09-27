import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-pond',
  templateUrl: './add-pond.component.html',
  styleUrls: ['./add-pond.component.scss']
})
export class AddPondComponent implements OnInit {

  public form: FormGroup;
  // selected = 'option2';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      pond: [null, Validators.compose([Validators.required])],
      pondarea: [null, Validators.compose([Validators.required])],
      ponddepth: [null, Validators.compose([Validators.required])],
      pondstatus: [null, Validators.compose([Validators.required])]
    });
  }

}