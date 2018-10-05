import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcost-pondprepare',
  templateUrl: './addcost-pondprepare.component.html',
  styleUrls: ['./addcost-pondprepare.component.scss']
})
export class AddcostPondprepareComponent implements OnInit {

  public form: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      label: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])],
      responsible: [null, Validators.compose([Validators.required])]
    });
  }

}
