import { httpOptions } from './../contants/http';
import { api_url, api_port } from './../contants/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  public register(user: IUsers): Observable<any> {
    return this.http.post(api_url+':'+ api_port + '/api/user/register', user, httpOptions);
  }

  public signin(user: any): Observable<any> {
    return this.http.post(api_url + ':' + api_port + '/api/user/login', user);
  }
}
