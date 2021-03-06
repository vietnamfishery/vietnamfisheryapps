import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../constants/api';
import { actionUserServices, ActionServer } from '../constants';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';


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
        return this.http.get<any>(api + '/seasons/gets', this.appService.setHeader(token));
    }
    
    public getPresentSeason4Stocking(ownerId: any, token: string): Observable<any> {
        const headers: any = {
            headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
                'Authorization': 'vietnamfishery' + ' ' + token,
			})
        }
        return this.http.get<any>(api + '/seasons/gets?present=true', headers);
    }

    public getPresentSeason(present: boolean, token: string): Observable<any> {
        return this.http.get<any>(api + `/seasons/gets?present=${ present }`, this.appService.setHeader(token));
    }

    public getSeasonBySeasonUUId(seasonUUId: string, token: string): Observable<any> {
        return this.http.get<any>(api + '/seasons/gets/' + seasonUUId, this.appService.setHeader(token));
    }

    public addseason(data: any, token: string): Observable<any> {
        return this.http.post(api + '/seasons/add', data, this.appService.setHeader(token));
    }

    public updateseason(data: any, token: string): Observable<any> {
        return this.http.put(api + '/seasons/update', data, this.appService.setHeader(token));
    }

    public addSeasonAndPond(data: any, token: string): Observable<any> {
        return this.http.post(api + '/seasonAndPond/add', data, this.appService.setHeader(token));
    }
    
    public getUsingFood(data: any, token: string): Observable<any> {
        return this.http.post(api + '/usingFoods/gets', data, this.appService.setHeader(token));
    }

    public getUsingVeterinary(data: any, token: string): Observable<any> {
        return this.http.post(api + '/usingVeterinary/gets', data, this.appService.setHeader(token));
    }
}
