import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
// import { headers } from '../contants/http';

const host = api_url + ':' + api_port + '/api';
const headers = new  HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
@Injectable({
  providedIn: 'root'
})
export class PondManagementService {

  constructor(
    private http: HttpClient
  ) {

  }

  public addpond(pond: any): Observable<any> {
    return this.http.post(host + '/uploads/image', pond, {headers});
  }
}
