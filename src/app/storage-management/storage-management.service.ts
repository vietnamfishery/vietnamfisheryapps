import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { api_url, api_port } from '../constants/api';

const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class StorageManagementService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    /**
     * Get vật phẩm trong kho theo loại
     * @param token 
     * @param type 
     */
    getStorageWithUser(token: any, type): Observable<any> {
        return this.http.get(host + '/storages/gets', this.setHeader(token, type));
    }

    getBreedWithUser(token: any): Observable<any> {
        return this.http.get(host + '/breeds/gets', this.appService.setHeader(token));
    }

    addStorage(token: any, data: any): Observable<any> {
        return this.http.post(host + '/storages/add', data, this.appService.setHeader(token))
    }

    addBreed(token: string, data: any): Observable<any> {
        return this.http.post(host + '/breeds/add', data, this.appService.setHeader(token))
    }

    setHeader(token: string, type: number): any {
        return {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'vietnamfishery' + ' ' + token,
                'type': type + ''
            })
        }
    }

    public updateFood(data: any, token: string): Observable<any> {
        return this.http.put(host + '/storages/food/update', data, this.appService.setHeader(token));
    }

    getCoupons(token: string, data: any): Observable<any> {
        return this.http.get(host + `/storages/coupons/gets/${ data.seasonId }`, this.appService.setHeader(token));
    }
}
