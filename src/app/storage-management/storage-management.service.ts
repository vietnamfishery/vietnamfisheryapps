import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from 'src/environments';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class StorageManagementService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  getStorageWithUser(token: any): Observable<any> {
    return this.http.get(host + '/storages/gets', this.appService.setHeader(token));
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
}
