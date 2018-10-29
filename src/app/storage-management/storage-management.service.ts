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
}
