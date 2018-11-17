import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
import { actionUserServices } from '../constants';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';
@Injectable({
    providedIn: 'root'
})
export class PondManagementService {

    constructor(
        private http: HttpClient,
        private appService: AppService
    ) {

    }

    public loadImage(id: string) {
        return this.http.get(host + '/getFile/image/' + id);
    }

    public uploadImage(file: File, token: string): Observable<any> {
        const fd = new FormData();
        fd.append('image', file, file.name);
        fd.append('action', actionUserServices.UPLOAD_IMAGE);

        return this.http.post(host + '/user/updateUser', fd, this.appService.setHeader(token));
    }

    public addPond(data: any, token: string): Observable<any> {
        const fd = new FormData();
        fd.append('images', data.images, data.images.name);
        fd.append('pondName', data.pondName);
        fd.append('pondCreatedDate', data.pondCreatedDate);
        fd.append('pondArea', data.pondArea);
        fd.append('pondDepth', data.pondDepth);
        fd.append('createCost', data.createCost);
        fd.append('pondLatitude', data.pondLatitude);
        fd.append('pondLongitude', data.pondLongitude);
        fd.append('status', data.status);
        return this.http.post(host + '/ponds/add', fd, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            })
        });
    }

    public getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    public getAllPond(token: string): Observable<any> {
        return this.http.get<any>(host + '/ponds/gets', this.appService.setHeader(token));
    }

    public getPondByUUId(UUid: string, token): Observable<any> {
        return this.http.get(host + '/ponds/get/' + UUid, this.appService.setHeader(token));
    }

    public getPondWithoutImages(token: string): Observable<any> {
        return this.http.get(host + '/ponds/gets/withoutImage', this.appService.setHeader(token));
    }

    public updatePond(data: any, token): Observable<any> {
        const fd = new FormData();
        fd.append('images', data.images, data.images.name);
        fd.append('pondUUId', data.pondUUId);
        fd.append('pondName', data.pondName);
        fd.append('pondCreatedDate', data.pondCreatedDate);
        fd.append('pondArea', data.pondArea);
        fd.append('pondDepth', data.pondDepth);
        fd.append('createCost', data.createCost);
        fd.append('pondLatitude', data.pondLatitude);
        fd.append('pondLongitude', data.pondLongitude);
        fd.append('status', data.status);
        return this.http.put(host + '/ponds/update', fd, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            })
        });
    }

    public getEmployeePond(token: string): Observable<any> {
        return this.http.get<any>(host + '/user/roles/gets/employees/pond', this.appService.setHeader(token));
    }

    public addPondUserRole(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/pondUserRoles/add', data, this.appService.setHeader(token));
    }
    
    public getPondNotInSeasonAndPond(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/ponds/get/notin/seasonAndPond', data, this.appService.setHeader(token));
    }
    
    /**
     * Lấy ra danh sách ao của vụ hiện tại
     * @method POST
     * @param data {ownerId}
     * @param token 
     */
    public getAllPondWithPresentSeason(data: any, token: string): Observable<any> {
        return this.http.post(host + '/ponds/gets/ownerSeason', data, this.appService.setHeader(token));
    }
    
    public getAllPondWithPresentSeasonWithImage(data: any, token: string): Observable<any> {
        return this.http.post(host + '/ponds/gets/ownerSeason/WithImage', data, this.appService.setHeader(token));
    }

    public getPondBySeasonUUId(data: any, token: string): Observable<any> {
        return this.http.post<any>(host + '/ponds/gets/seasonUUId', data, this.appService.setHeader(token));
    }
}
