import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
    snackBarRefComponent: any;
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

    ngOnInit() {
    }

    dismiss() {
        this.snackBarRefComponent.dismiss()
    }
}
