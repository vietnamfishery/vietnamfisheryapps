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

		return this.http.get(host + '/user/info', h);
	}

	updateUserInfo(user: any, token: string): Observable<any> {
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Authorization': token
			})
		}
		const fd = new FormData();
		const file: File = <File>user.files
		const { lastname, firstname, birthday, email, phone, province, district, town } = user;
		fd.append('image', file, file.name);
		fd.append('lastname', lastname);
		fd.append('firstname', firstname);
		fd.append('birthday', birthday);
		fd.append('email', email);
		fd.append('phone', phone);
		fd.append('province', province);
		fd.append('district', district);
		fd.append('town', town);
		fd.append('action', actionUserServices.UPDATEMYPROFILE);
		return this.http.post(host + '/user/updateUser', fd, h);
		// fd.append('image', file, file.name);
		// fd.append('pond', pond);
		// fd.append('pondArea', pondarea);
		// fd.append('pondDepth', ponddepth);
		// fd.append('pondStatus', pondstatus);
		// console.log(file);
	}

	updateUserPassword(user: any, token: string): Observable<any>{
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Authorization': token
			})
		}
		// const fd = new FormData();
		// const { password, passwordchange } = user;
		// fd.append('password', password);
		// fd.append('password', passwordchange);
		// fd.append('action', actionUserServices.CHANGEUSERPASSWORD);
		user[`action`] = actionUserServices.CHANGEUSERPASSWORD;
		return this.http.post(host + '/user/updateUserPassword', h);
	}
}
