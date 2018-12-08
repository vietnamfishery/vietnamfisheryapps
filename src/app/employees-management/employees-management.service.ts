import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../constants/api';
import { headers } from '../constants/http';
import { Users } from '../models/users';
import { AppService } from '../app.service';

// const api = api + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class EmployeesManagementService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) { }

    public register_employees(user: Users, token: string): Observable<any> {
        return this.http.post(api + '/user/register/employee', user, this.appService.setHeader(token));
    }

    public getEmployee(token: string): Observable<any> {
        return this.http.get(api + '/user/gets/employees', this.appService.setHeader(token));
    }

    public getEmployeesWithoutIsDeleted(token: string): Observable<any> {
        return this.http.get(api + '/user/gets/employees/withoutIsDelete', this.appService.setHeader(token));
    }

    // public getEmployeePondRoles(token: string): Observable<any> {
    //     return this.http.get(api + '/ponds/gets/employees', this.appService.setHeader(token));
    // }

    public getEmployeeById(token: string, rolesId: number): Observable<any> {
        return this.http.get(api + '/user/get/employee', {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'vietnamfishery' + ' ' + token,
                'rolesid': rolesId.toString()
            })
        });
    }

    public addOnlyRolesEmployee(token, data): Observable<any> {
        return this.http.post(api + '/user/insert/employee/role', data, this.appService.setHeader(token));
    }

    public updateRolesEmployee(token: string, data: any): Observable<any> {
        return this.http.put(api + '/pondUserRoles/update', data, this.appService.setHeader(token));
    }

    public deleteRolesEmployee(token: string, data: any): Observable<any> {
        return this.http.put(api + '/userRoles/delete', data, this.appService.setHeader(token));
    }

    /**
     * Get all employees with they roles - if default get all employees
     * @param token 
     * @param roles - options('',1,2)
     */
    public getEmployees(token: string, roles?: any): Observable<any> {
        const h: any = this.appService.customHeader({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'vietnamfishery' + ' ' + token,
            'roles': roles ? roles + '' : ''
        });
        return this.http.get(api + '/userRoles/gets', h);
    }

    /**
     * @method GET
     * Get all emp, pond manage with emp, info emp
     */
    getUserManageWithPond(token: string): Observable<any>  {
        return this.http.get(api + '/pondUserRoles/gets', this.appService.setHeader(token));
    }

    public getAllPondAndEmployees(token: string): Observable<any> {
        return this.http.get(api + '/user/gets/all/employees/pond', this.appService.setHeader(token));
    }

    public addPondUserRole(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/pondUserRoles/add', data, this.appService.setHeader(token));
    }

    public delPondUserRole(data: any, token: string): Observable<any> {
        return this.http.put<any>(api + '/pondUserRoles/delete', data, this.appService.setHeader(token));
    }

    public upsertUserRole(data: any, token: string): Observable<any> {
        return this.http.put<any>(api + '/userRoles/upsert', data, this.appService.setHeader(token));
    }

    public changeRoles(data: any, token: string): Observable<any> {
        return this.http.put<any>(api + '/userRoles/change', data, this.appService.setHeader(token));
    }
}
