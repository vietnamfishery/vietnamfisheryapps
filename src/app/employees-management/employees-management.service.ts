import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../contants/api';
import { headers } from '../contants/http';
import { IUsers } from '../models/users';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class EmployeesManagementService {

  constructor(
    private http: HttpClient
  ) { }

  public register_employees(user: IUsers): Observable<any> {
    return this.http.post(host + '/user/register', user, headers.APP_JSON);
  }
}
