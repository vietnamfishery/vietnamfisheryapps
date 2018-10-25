import { Injectable } from '@angular/core';
import { api_url, api_port } from '../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { actionUserServices } from '../constants';
import { fbind } from 'q';

const host = api_url + ':' + api_port + '/api';

@Injectable({
	providedIn: 'root'
})
export class ProfileManagementService {

	constructor(
		private http: HttpClient
	) { }

	getUserInfo(token: string): Observable<any> {
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}

		return this.http.get(host + '/user/get', h);
	}

	/**
	 * Hàm này dùng để get info truyền lên form nếu dùng hàm getUserInfo ở trên
	 * thì api sẽ gọi thêm Google Drive API nặng và lâu nên tách ra thêm một hàm
	 * bên dưới để chỉ load thông tin từ Nodejs API thôi cho nhẹ
	 * @param token
	 */
	getUserInfoWithUpdate(token: string): Observable<any> {
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}

		return this.http.get(host + '/user/getWithUpdate', h);
	}

	updateUserInfo(user: any, token: string): Observable<any> {
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Authorization': token
			})
		}
		const fd = new FormData();
		const { lastname, firstname, birthday, email, phone, province, district, town, images } = user;
		fd.append('lastname', lastname);
		fd.append('firstname', firstname);
		fd.append('birthday', birthday);
		fd.append('email', email);
		fd.append('phone', phone);
		fd.append('province', province);
		fd.append('district', district);
		fd.append('town', town);
		fd.append('images', images);
		fd.append('action', actionUserServices.UPDATEMYPROFILE);
		return this.http.post(host + '/user/updateUser', fd, h);
	}

	updateUserPassword(data: any, token: string): Observable<any>{
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Authorization': token
			})
		}
		data[`action`] = actionUserServices.CHANGEUSERPASSWORD;
		return this.http.post(host + '/user/updateUserPassword', data, h);
	}

	loadImage(id: string){
		return this.http.get(host + '/getFile/image/' + id);
	}

	uploadImage(file: File, token: string): Observable<any> {
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Authorization': token
			})
		}
		const fd = new FormData();
		fd.append('image', file, file.name);
		return this.http.put(host + '/user/update', fd, h);
	}
}
