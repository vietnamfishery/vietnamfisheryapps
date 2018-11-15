import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-using-veterinary',
    templateUrl: './using-veterinary.component.html',
    styleUrls: ['./using-veterinary.component.scss']
})
export class UsingVeterinaryComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    goto(path) {
        this.router.navigate([path]);
    }
}
