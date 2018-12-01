import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-edit-detail-harvest',
    templateUrl: './edit-detail-harvest.component.html',
    styleUrls: ['./edit-detail-harvest.component.scss']
})
export class EditDetailHarvestComponent implements OnInit {

    public form: FormGroup;
    selected: any = {}
    selected2: any = {}
    selected3: any = {}

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

    onSubmit() {}
}
