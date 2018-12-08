import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../constants/api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root'
})
export class GrowthsManagementService {

    constructor(
        private appService: AppService,
        private http: HttpClient,
        private router: Router
    ) { }


    private setHeaderId(id: string, token: string): any {
        return {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'vietnamfishery' + ' ' + token,
                'growthid': id
            })
        }
    }


    public getGrowth(data: any, token: string): Observable<any> {
        return this.http.post(api + '/growths/gets', data, this.appService.setHeader(token));
    }

    public getGrowthByGrowthUUId(data: any, token): Observable<any> {
        return this.http.post(api + '/growths/get/growthUUId', data, this.appService.setHeader(token));
    }

    public updateGrowth(data: any, token): Observable<any> {
        return this.http.put(api + '/growths/update', data, this.appService.setHeader(token));
    }

    addGrowth(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/growths/add', data, this.appService.setHeader(token));
    }
}
