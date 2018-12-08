import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";

@Component({
    selector: 'app-calendar-dialog',
    templateUrl: './template.html'
})
export class CalendarDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CalendarDialogComponent>,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    goto(path: string) {
        this.router.navigate([path]);
    }
}