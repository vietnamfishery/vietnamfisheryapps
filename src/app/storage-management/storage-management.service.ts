import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { api } from '../constants/api';


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
        return this.http.get(api + '/storages/gets', this.setHeader(token, type));
    }

    getBreedWithUser(token: any): Observable<any> {
        return this.http.get(api + '/breeds/gets', this.appService.setHeader(token));
    }

    addStorage(token: any, data: any): Observable<any> {
        return this.http.post(api + '/storages/add', data, this.appService.setHeader(token))
    }

    addBreed(token: string, data: any): Observable<any> {
        return this.http.post(api + '/breeds/add', data, this.appService.setHeader(token))
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
        return this.http.put(api + '/storages/food/update', data, this.appService.setHeader(token));
    }

    getCoupons(token: string, data: any): Observable<any> {
        return this.http.get(api + `/storages/coupons/gets/${ data.seasonId }`, this.appService.setHeader(token));
    }
}
