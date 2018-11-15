import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_url, api_port } from '../constants/api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';
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
                'Authorization': token,
                'growthid': id
            })
        }
    }


    public getGrowth(token: string): Observable<any> {
        return this.http.post(host + '/growth/gets', {
            seasonId: 15,
            pondId: 39
        }, this.appService.setHeader(token));
    }

    public getGrowthById(id: string, token): Observable<any> {
        return this.http.get(host + '/growth/get', this.setHeaderId(id, token));
    }

    public updateGrowth(data: any, token): Observable<any> {
        return this.http.put(host + '/growth/update', data, this.appService.setHeader(token));
    }

    addGrowth(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/growths/add', data, this.appService.setHeader(token));
    }
}
