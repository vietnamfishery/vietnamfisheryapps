import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from './constants/api';

// const api = api + ':' + api_port + '/api';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        protected http: HttpClient
    ) {

    }
    setCookie(cname: string, cvalue: any, exdays: any) {
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
        let res: any;
        const arr = document.cookie.split('; ');
        arr.forEach(e => {
            if (e.split('=')[0] === cname) {
                res = e.split('=')[1] === 'true' ? true : e.split('=')[1] === 'false' ? false : e.split('=')[1]
            }
        });
        return res;
    }

    getProvince(): Observable<any[]> {
        return this.http.get<any[]>(api + '/province');
    }

    getDistrict(): Observable<any[]> {
        return this.http.get<any[]>(api + '/district');
    }

    getDistrictByProvinceId(proId): Observable<any[]> {
        return this.http.get<any[]>(api + '/district', {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'provinceid': proId
            })
        });
    }

    getWard(): Observable<any[]> {
        return this.http.get<any[]>(api + '/ward');
    }

    getWardByDistrictId(disId): Observable<any[]> {
        return this.http.get<any[]>(api + '/ward', {
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
                'Authorization': 'vietnamfishery' + ' ' + token
            })
        }
    }

    public customHeader(obj: any): any {
        return {
            headers: new HttpHeaders(obj)
        }
    }

    loadImage(id: string): Promise<any>{
        return new Promise((resolve, reject) => {
            this.http.get(api + '/getFile/image/' + id).subscribe((res: any) => {
                if(res) {
                    resolve(res.data)
                }
            })
        })
	}

    vertify(token: string) {
        return this.http.get(api + '/user/vertify', this.setHeader(token || ''));
    }
    
    vertifyBoss(token: string) {
        return this.http.get(api + '/user/vertify/boss', this.setHeader(token || ''));
    }
    
    vertifyPondRoles(token: string) {
        return this.http.get(api + '/user/vertify/roles/pond', this.setHeader(token || ''));
    }
    
    vertifyStorageRoles(token: string) {
        return this.http.get(api + '/user/vertify/roles/storage', this.setHeader(token || ''));
    }

    static getGoogleAPIKey(): Observable<any> {
        return 
    }
}
