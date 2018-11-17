import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { api_url, api_port } from '../constants/api';
import { Observable } from 'rxjs';
const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class StockingService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    addStocking(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/stocking/add', data, this.appService.setHeader(token));
    }

    public getStocking(data: any, token: string): Observable<any> {
        return this.http.post(host + '/stocking/gets', data, this.appService.setHeader(token));
    }
}
