import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../contants/api';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class PondManagementService {

  constructor(
    private http: HttpClient
  ) { }

  public getpond(pond: any): Observable<any> {
    return this.http.get(host + '/', pond);
  }

}
