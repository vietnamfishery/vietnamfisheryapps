import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { api } from '../constants/api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StockingService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    addStocking(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/stocking/add', data, this.appService.setHeader(token));
    }

    public getStocking(data: any, token: string): Observable<any> {
        return this.http.post(api + '/stocking/gets', data, this.appService.setHeader(token));
    }

    public getStockingDetailsByStockingDetailsUUId(data: any, token: string): Observable<any> {
        return this.http.post(api + '/stocking/get/stockingDetailUUId', data, this.appService.setHeader(token));
    }
    
    public updateStockingDetailsByStockingDetailsUUId(data: any, token: string): Observable<any> {
        return this.http.put(api + '/stocking/update', data, this.appService.setHeader(token));
    }
}
