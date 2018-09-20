import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-pond',
  templateUrl: './detail-pond.component.html',
  styleUrls: ['./detail-pond.component.scss']
})
export class DetailPondComponent implements OnInit {

  public form: FormGroup;
  selected = 'option2';
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
    });
  }

}
