import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
import { headers } from '../constants/http';
import { Users } from '../models/users';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class EmployeesManagementService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  public register_employees(user: Users, token: string): Observable<any> {
    return this.http.post(host + '/user/register/employee', user, this.appService.setHeader(token));
  }

  public getEmployee(token: string): Observable<any> {
    return this.http.get(host + '/user/gets/employees', this.appService.setHeader(token));
  }

  public getEmployeePondRoles(token: string): Observable<any> {
    return this.http.get(host + '/ponds/gets/employees', this.appService.setHeader(token));
  }

  public getEmployeeById(token: string, rolesId: number): Observable<any> {
    return this.http.get(host + '/user/get/employee', {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
        'Authorization': token,
        'rolesid': rolesId.toString()
			})
		});
  }

  addOnlyRolesEmployee(token, data): Observable<any> {
    return this.http.post(host + '/user/insert/employee/role', data, this.appService.setHeader(token));
  }

  public updateRolesEmployee(token: string, data: any): Observable<any> {
    return this.http.put(host + '/user/update/employee', data,this.appService.setHeader(token));
  }
}
