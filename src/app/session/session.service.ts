import { headers } from './../constants/http';
import { api_url, api_port } from './../constants/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUsers } from '../models/users';
import { actionUserServices } from '../constants';
import { delay, tap } from 'rxjs/operators';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(
    private http: HttpClient
  ) { }

  public register(user: IUsers): Observable<any> {
    return this.http.post(host + '/user/register', user, headers.APP_JSON);
  }

  public signin(user: any): Observable<any> {
    return this.http.post(host + '/user/login', user).pipe(
      // delay(500),
      tap(val => {
        this.isLoggedIn = val.success
      }));
  }

  public signout(): void {
    this.isLoggedIn = false;
  }

  public test(): Observable<any> {
    return this.http.get(host + '/user/login-ui');
  }
}
