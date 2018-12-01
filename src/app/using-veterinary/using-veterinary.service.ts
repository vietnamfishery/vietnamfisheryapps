import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { api_url, api_port } from '../constants/api';
const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class UsingVeterinaryService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    addVeterinary = (data: any, token: string): Observable<any> => {
        return this.http.post(host + '/usingVeterinary/add', data, this.appService.setHeader(token))
    }
}
