import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
import { Router } from '@angular/router';
// import { headers } from '../constants/http';

const host = api_url + ':' + api_port + '/api';
const headers = new  HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
@Injectable({
  providedIn: 'root'
})
export class PondManagementService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  public addpond(pond: any): Observable<any> {
    return this.http.post(host + '/uploads/image', pond, {headers});
  }
}
