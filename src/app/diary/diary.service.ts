import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
import { AppService } from '../app.service';
const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
    constructor(
        private http: HttpClient,
		private appService: AppService
    ) { }

    addDiary(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/PondDiarys/add', data, this.appService.setHeader(token));
    }
}
