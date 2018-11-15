import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-using-food',
    templateUrl: './using-food.component.html',
    styleUrls: ['./using-food.component.scss']
})
export class UsingFoodComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    goto(path) {
        this.router.navigate([path]);
    }
}
