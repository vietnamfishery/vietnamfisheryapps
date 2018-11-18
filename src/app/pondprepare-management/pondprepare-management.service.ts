import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { api_url, api_port } from '../constants/api';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';
@Injectable({
    providedIn: 'root'
})
export class PondprepareManagementService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    public getAllPondPrepare(data: any, token: string): Observable<any> {
        return this.http.post(host + '/pondPrepares/gets', data, this.appService.setHeader(token));
    }

    public addNewPrepare(token: string, data: any): Observable<any> {
        return this.http.post(host + '/pondPrepares/addNew', data, this.appService.setHeader(token));
    }
    
    public addIncurred(data: any, token: string): Observable<any> {
        return this.http.post(host + '/pondPrepares/incurreds/add', data, this.appService.setHeader(token));
    }
    
    public getPondPrepareByPondPrePareUUId(data: any, token: string): Observable<any> {
        return this.http.post(host + '/pondPrepares/gets/uuid', data, this.appService.setHeader(token));
    }
    
    public getIncurredByIncurredUUId(data: any, token: string): Observable<any> {
        return this.http.post(host + '/pondPrepares/incurreds/get/uuid', data, this.appService.setHeader(token));
    }
    
    public updateIncurred(data: any, token: string): Observable<any> {
        return this.http.put(host + '/pondPrepares/incurreds/update', data, this.appService.setHeader(token));
    }
}
