import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { api } from '../constants/api';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class UsingFoodService {

    constructor(
        private socket: Socket,
        private http: HttpClient,
        private appService: AppService
    ) { }

    addUsingFood = (data: any, token: string): Observable<any> => {
        return this.http.post(api + '/usingFoods/add', data, this.appService.setHeader(token))
    }

    getTake(data: any, token: string): Observable<any> {
        return this.http.post(api + '/usingFoods/add', data, this.appService.setHeader(token))
    }

    onUpdateUsingFood(): Observable<any> {
        return new Observable<any>(obs => {
            this.socket.on('update-using-food-status', (data: any) => obs.next(data))
        })
    }
}
