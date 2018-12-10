import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../constants/api';
import { actionUserServices } from '../constants';
import { AppService } from '../app.service';

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
        return this.http.get(api + '/getFile/image/' + id);
    }

    public uploadImage(file: File, token: string): Observable<any> {
        const fd = new FormData();
        fd.append('image', file, file.name);
        fd.append('action', actionUserServices.UPLOAD_IMAGE);

        return this.http.post(api + '/user/updateUser', fd, this.appService.setHeader(token));
    }

    public addPond(data: any, token: string): Observable<any> {
        const fd = new FormData();
        fd.append('images', data.images, data.images ? data.images.name : '');
        fd.append('pondName', data.pondName);
        fd.append('pondCreatedDate', data.pondCreatedDate);
        fd.append('pondArea', data.pondArea);
        fd.append('pondDepth', data.pondDepth);
        fd.append('createCost', data.createCost);
        fd.append('pondLatitude', data.pondLatitude ? data.pondLatitude : '');
        fd.append('pondLongitude', data.pondLongitude ? data.pondLongitude : '');
        fd.append('status', data.status);
        return this.http.post(api + '/ponds/add', fd, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'vietnamfishery' + ' ' + token
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

    public getAllPond(token: string, data: any = {
        seasonUUId: '',
        status: '',
        seasonId: ''
    }): Observable<any> {
        return this.http.get<any>(api + `/ponds/gets?seasonUUId=${ data.seasonUUId ? data.seasonUUId : '' }&status=${ data.status ? data.status : '' }&seasonId=${ data.seasonId ? data.seasonId : '' }`, this.appService.setHeader(token));
    }

    public getPondByUUId(UUid: string, token: string): Observable<any> {
        return this.http.get(api + '/ponds/get/' + UUid, this.appService.setHeader(token));
    }

    public getPondWithoutImages(token: string): Observable<any> {
        return this.http.get(api + '/ponds/gets/withoutImage', this.appService.setHeader(token));
    }

    public updatePond(data: any, token: string): Observable<any> {
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
        return this.http.put(api + '/ponds/update', fd, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'vietnamfishery' + ' ' + token
            })
        });
    }

    public updatePondJSON(data: any, token: string): Observable<any> {
        return this.http.put<any>(api + '/ponds/update', data,this.appService.setHeader(token));
    }

    public getEmployeePond(token: string): Observable<any> {
        return this.http.get<any>(api + '/userRoles/gets/employees/pond', this.appService.setHeader(token));
    }

    public addPondUserRole(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/pondUserRoles/add', data, this.appService.setHeader(token));
    }
    
    public getPondNotInSeasonAndPond(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/ponds/get/notin/seasonAndPond', data, this.appService.setHeader(token));
    }
    
    /**
     * Lấy ra danh sách ao của vụ hiện tại
     * @method POST
     * @param data {ownerId}
     * @param token 
     */
    public getAllPondWithPresentSeason(data: any, token: string): Observable<any> {
        return this.http.post(api + '/ponds/gets/ownerSeason', data, this.appService.setHeader(token));
    }
    
    public getAllPondWithPresentSeasonWithImage(data: any, token: string): Observable<any> {
        return this.http.post(api + '/ponds/gets/ownerSeason/WithImage', data, this.appService.setHeader(token));
    }

    public getPondBySeasonUUId(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/ponds/gets/seasonUUId', data, this.appService.setHeader(token));
    }
    
    /**
     * Get ao theo options
     * @param options - JSON Object
     * ```js
     * {
     *      image: get ao kèm thêm hình
     *      isnull: get ao trống
     *      isnotnull: get ao đang nuôi thả
     *      isupgrade: get ao đang nâng cấp
     *      seasonid: get ao đang nâng cấp
     * }
     * ```
     * @param token 
     */
    public getPondAdvanced(options: any, token: string): Observable<any> {
        const headers = {
            headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
                'Authorization': 'vietnamfishery' + ' ' + token,
                'image': options.image ? options.image + '' : '',
                'isnull': options.isnull ? options.isnull + '' : '',
                'isnotnull': options.isnotnull ? options.isnotnull + '' : '',
                'isupgrade': options.isupgrade ? options.isupgrade + '' : '',
                'seasonid': options.seasonid ? options.seasonid + '' : ''
			})
        }
        return this.http.get<any>(api + '/ponds/gets/advanced', headers);
    }

    countSeasonWithPond(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/ponds/seasons/count', data, this.appService.setHeader(token));
    }

    /**
     * Get All pond mà người dùng chỉ định không có quản lý
     * @method POST
     * @param data.employeeId
     */
    getPondWithUserNotManage(data: any, token: string): Observable<any> {
        return this.http.post<any>(api + '/ponds/gets/notEmployee', data, this.appService.setHeader(token));
    }

    getPondOfBoss(token: string): Observable<any> {
        return this.http.get<any>(api + '/ponds/gets/boss', this.appService.setHeader(token));
    }
}
