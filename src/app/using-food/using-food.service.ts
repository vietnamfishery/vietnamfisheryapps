import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { api_url, api_port } from '../constants/api';
const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class UsingFoodService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    addUsingFood = (data: any, token: string): Observable<any> => {
        return this.http.post(host + '/usingFoods/add', data, this.appService.setHeader(token))
    }

    getTake(data: any, token: string): Observable<any> {
        return this.http.post(host + '/usingFoods/add', data, this.appService.setHeader(token))
    }
}
