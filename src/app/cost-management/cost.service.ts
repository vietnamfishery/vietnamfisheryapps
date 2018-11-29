import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url, api_port } from '../constants/api';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class CostService {

    constructor(
        private appService: AppService,
        private http: HttpClient
    ) { }

    /**
     * get cost theo vụ
     * @param data JSON { seasonId }
     * @param token 
     */
    public getCost(data: any, token: string): Observable<any> {
        return this.http.get(host + '/prices/gets/' + data.seasonId, this.appService.setHeader(token));
    }
}
