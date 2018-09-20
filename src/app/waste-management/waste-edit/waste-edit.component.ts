import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    });
  }

}
