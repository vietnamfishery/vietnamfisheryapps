import { tokenName } from './../../environments/environment';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
import { Router } from '@angular/router';
import { actionUserServices, ActionServer } from '../constants';
// import { headers } from '../constants/http';

const host = api_url + ':' + api_port + '/api';
@Injectable({
	providedIn: 'root'
})
export class PondManagementService {

	constructor(
		private http: HttpClient,
		private router: Router
	) {

	}

	loadImage(id: string) {
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
		fd.append('action', actionUserServices.UPLOAD_IMAGE);
		return this.http.post(host + '/user/updateUser', fd, h);
	}

	public addpond(data: any, token: string): Observable<any> {
		const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}
		return this.http.post(host + '/ponds/add', data, h);
	}

	public getAllPond(token: string): Observable<any> {
		return this.http.get<any>(host + '/ponds/gets', this.setHeader(token));
	}

	public getPondById(id: string, token): Observable<any> {
		return this.http.get(host + '/ponds/get/'+ id, this.setHeader(token));
	}

	public updatePond(data: any, token): Observable<any> {
		return this.http.put(host + '/ponds/update', data, this.setHeader(token));
	}

	private setHeader(token: string): any {
		return {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}
	}
}
