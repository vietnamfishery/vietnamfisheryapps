import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from './constants';

const host = api_url + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private http: HttpClient
    ) { }
    setCookie(cname, cvalue, exdays) {
        if (exdays != 0) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        } else {
            document.cookie = cname + "=" + cvalue + ";path=/";
        }
    }

    getCookie(cname: string) {
        let res;
        const arr = document.cookie.split('; ');
        arr.forEach(e => {
            if (e.split('=')[0] === cname) {
                res = e.split('=')[1] === 'true' ? true : e.split('=')[1] === 'false' ? false : e.split('=')[1]
            }
        });
        return res;
    }

    getProvince(): Observable<any[]> {
        return this.http.get<any[]>(host + '/province');
    }

    getDistrict(): Observable<any[]> {
        return this.http.get<any[]>(host + '/district');
    }

    getDistrictByProvinceId(proId): Observable<any[]> {
        return this.http.get<any[]>(host + '/district', {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'provinceid': proId
            })
        });
    }

    getWard(): Observable<any[]> {
        return this.http.get<any[]>(host + '/ward');
    }

    getWardByDistrictId(disId): Observable<any[]> {
        return this.http.get<any[]>(host + '/ward', {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'districtid': disId
            })
        });
    }

    public setHeader(token: string): any {
        return {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }
    }

    public customHeader(obj: any): any {
        return {
            headers: new HttpHeaders(obj)
        }
    }
}
