import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { api_url, api_port } from '../constants/api';
import { Observable } from 'rxjs';

const host = api_url + ':' + api_port + '/api';
@Injectable({
    providedIn: 'root'
})
export class PondprepareManagementService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    private setHeader(token: string): any {
        return {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }
    }

    public getPondPrepareAll(token: string): Observable<any> {
        return this.http.post(host + '/PondPrepares/gets', {
            seasonId: 15,
            pondId: 39
        }, this.setHeader(token));
    }

    public addNewPrepare(token: string, data: any): Observable<any> {
        return this.http.post(host + '/PondPrepares/addNew', data, this.setHeader(token));
    }
}
