import { map } from 'rxjs/operators';
import { headers } from './../constants/http';
import { api_url, api_port } from './../constants/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../models/users';
import { actionUserServices } from '../constants';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  public register(user: IUsers): Observable<any> {
    user[`action`] = actionUserServices.REGISTER;
    return this.http.post(host + '/user/register', user, headers.APP_JSON);
  }

  public signin(user: any): Observable<any> {
    user[`action`] = actionUserServices.LOGIN;
    return this.http.post(host + '/user/login', user);
  }

  public getfail(): Observable<any> {
    return this.http.get(host + '/user/login');
  }
}
