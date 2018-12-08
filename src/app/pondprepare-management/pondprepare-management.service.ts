import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { api } from '../constants/api';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root'
})
export class PondprepareManagementService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    public getAllPondPrepare(data: any, token: string): Observable<any> {
        return this.http.post(api + '/pondPrepares/gets', data, this.appService.setHeader(token));
    }

    public addNewPrepare(token: string, data: any): Observable<any> {
        return this.http.post(api + '/pondPrepares/addNew', data, this.appService.setHeader(token));
    }
    
    public addPrepareOldPond(token: string, data: any): Observable<any> {
        return this.http.post(api + '/pondPrepares/add/exiting-pond', data, this.appService.setHeader(token));
    }
    
    public addIncurred(data: any, token: string): Observable<any> {
        return this.http.post(api + '/pondPrepares/incurreds/add', data, this.appService.setHeader(token));
    }
    
    public getPondPrepareByPondPrePareUUId(data: any, token: string): Observable<any> {
        return this.http.post(api + '/pondPrepares/gets/uuid', data, this.appService.setHeader(token));
    }
    
    public getIncurredByIncurredUUId(data: any, token: string): Observable<any> {
        return this.http.post(api + '/pondPrepares/incurreds/get/uuid', data, this.appService.setHeader(token));
    }
    
    public updateIncurred(data: any, token: string): Observable<any> {
        return this.http.put(api + '/pondPrepares/incurreds/update', data, this.appService.setHeader(token));
    }
}
