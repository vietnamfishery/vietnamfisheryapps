import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../contants/api';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class PondManagementService {

  constructor(
    private http: HttpClient,
    private headers : HttpHeaders
  ) {
    
  }

  // public getpond(pond: any): Observable<any> {
  //   return this.http.get(host + '/', pond);
  // }

  public addpond(pond: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type' :'multipart/form-data'
    });
    return this.http.post(host + '/uploads/image', pond, { headers: this.headers});
  }  


}
