import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

    constructor(
        private appService: AppService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    signgout() {
        this.appService.setCookie('vietnamfishery', '', 'expires=Thu, 01 Jan 1970 00:00:00 UTC');
        this.router.navigate(['session/signin']);
    }

}
