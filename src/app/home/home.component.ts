import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as jwtDecode from 'jwt-decode';
import { tokenName } from '../constants/constant';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    
    preloader: boolean = false;
    token: string;
    ownerId: number;
    lastname: string;
    firstname: string;
    isBoss: boolean = false;
    lineChartOptions: any = {};

    // public lineChartData: Array<any> = [
    //     {data: [1], label: 'Series A'},
        // {data: [2, 4, 4, 1, 8.6, 3.2, 0], label: 'Series B'}
    // ];

    // public lineChartLabels: Array<any> = ['14/11/2018'];
    // public lineChartType: string = 'line';

    constructor(
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.lastname = deToken.lastname;
        this.firstname = deToken.firstname;
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : (deToken.roles[0] ? deToken.roles[0].bossId : null);
        if(deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
    }

    // public chartClicked(e: any): void {
    //     console.log(e);
    // }

    // public chartHovered(e: any): void {
    //     console.log(e);
    // }
}
