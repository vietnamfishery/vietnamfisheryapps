import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


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
    });
  }

}