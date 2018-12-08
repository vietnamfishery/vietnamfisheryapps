import { headers } from './../constants/http';
import { api } from './../constants/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users } from '../models/users';
import { actionUserServices } from '../constants';
import { delay, tap } from 'rxjs/operators';


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

  public register(user: Users): Observable<any> {
    return this.http.post(api + '/user/register', user, headers.APP_JSON);
  }

  public signin(user: any): Observable<any> {
    return this.http.post(api + '/user/login', user).pipe(
      // delay(500),
      tap(val => {
        this.isLoggedIn = val.success
      }));
  }

  public signout(): void {
    this.isLoggedIn = false;
  }

  public test(): Observable<any> {
    return this.http.get(api + '/user/login-ui');
  }
}
