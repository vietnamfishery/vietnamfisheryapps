import { Component, OnInit } from '@angular/core';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';
import { MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { AppState } from 'src/app/rootStores/models/model';
import { Store } from '@ngrx/store';
import { CostService } from '../cost.service';
import * as jwtDecode from 'jwt-decode';
import { tokenName } from 'src/app/constants/constant';

@Component({
    selector: 'app-cost-takecareof',
    templateUrl: './cost-takecareof.component.html',
    styleUrls: ['./cost-takecareof.component.scss']
})
export class CostTakecareofComponent implements OnInit {

    token: string;
    ownerId: number;
    isBoss: boolean = false;
    totalAll: number = null;
    
    constructor(
        private seasionManagementService: SeasionManagementService,
        public snackBar: MatSnackBar,
        private appService: AppService,
        private store: Store<AppState>,
        private costService: CostService
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if (deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
    }

}
