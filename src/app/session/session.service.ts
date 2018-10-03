import { map } from 'rxjs/operators';
import { httpOptions } from './../contants/http';
import { api_url, api_port } from './../contants/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../models/users';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  public register(user: IUsers): Observable<any> {
    return this.http.post(host + '/user/register', user, httpOptions);
  }

  public signin(user: any): Observable<any> {
    return this.http.post(host + '/user/login', user);
  }

  public getfail(): Observable<any> {
    return this.http.get(host + '/user/login');
  }
}
