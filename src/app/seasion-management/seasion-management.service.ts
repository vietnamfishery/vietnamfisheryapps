import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_url, api_port } from '../constants/api';
import { actionUserServices, ActionServer } from '../constants';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';


const host = api_url + ':' + api_port + '/api';
const headers = new HttpHeaders();

@Injectable({
    providedIn: 'root'
})
export class SeasionManagementService {

    constructor(
        private appService: AppService,
        private http: HttpClient,
        private router: Router
    ) { }

    /**
     * Lấy danh sách ao của người dùng
     * @param token 
     */
    public getSeasonWithOwner(token: string): Observable<any> {
        return this.http.get<any>(host + '/seasons/gets', this.appService.setHeader(token));
    }
    
    public getPresentSeason(ownerId: any, token: string): Observable<any> {
        const headers: any = {
            headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
                'Authorization': token,
                'ownerid': ownerId+''
			})
        }
        return this.http.get<any>(host + '/seasons/gets/present', headers);
    }

    public getSeasonById(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/seasons/get', data, this.appService.setHeader(token));
    }

    public getSeasonBySeasonUUId(seasonUUId: string, token: string): Observable<any> {
        return this.http.get<any>(host + '/seasons/get/' + seasonUUId, this.appService.setHeader(token));
    }

    public addseason(data: any, token: string): Observable<any> {
        return this.http.post(host + '/seasons/add', data, this.appService.setHeader(token));
    }

    public updateseason(data: any, token: string): Observable<any> {
        return this.http.put(host + '/seasons/update', data, this.appService.setHeader(token));
    }

    public addSeasonAndPond(data: any, token: string): Observable<any> {
        return this.http.post(host + '/seasonAndPond/add', data, this.appService.setHeader(token));
    }
    
    public getTakeCare(data: any, token: string): Observable<any> {
        return this.http.post(host + '/takeCare/gets', data, this.appService.setHeader(token));
    }
}
