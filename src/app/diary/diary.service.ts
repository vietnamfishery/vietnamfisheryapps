import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../constants/api';
import { AppService } from '../app.service';
// const api = api + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
    constructor(
        private http: HttpClient,
		private appService: AppService
    ) { }

    addDiary(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/pondDiaries/add', data, this.appService.setHeader(token));
    }
   
    getDiary(data: any, token: string): Observable<any> {
        return this.http.get<any>(api + `/pondDiaries/gets?seasonId=${ data.seasonId }&pondId=${ data.pondId }&timeOut=${ data.timeOut }&unitOfTime=${ data.unitOfTime }`, this.appService.setHeader(token));
    }

    getDiaryByDiaryUUId(data: any, token: string): Observable<any> {
        return this.http.get<any>(api + `/pondDiaries/gets/${ data.pondDiaryUUId }`, this.appService.setHeader(token));
    }

    updateDiaryByUUId(data: any, token: string): Observable<any> {
        return this.http.put<any>(api + `/pondDiaries/update`, data, this.appService.setHeader(token));
    }
}
