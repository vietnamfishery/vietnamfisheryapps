import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../constants/api';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';
@Injectable({
  providedIn: 'root'
})
export class WasteManagementService {

  constructor(
		private appService: AppService,
    private http: HttpClient,
		private router: Router
  ) { }

	private setHeaderId(id: string, token: string): any {
		return {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token,
				'diedfisheryid': id
			})
		}
	}

  public getWasteAll(token: string): Observable<any> {
    return this.http.post(host + '/diedFishery/gets', {
			seasonId: 15,
			pondId: 39
		}, this.appService.setHeader(token));
	}
	
	public getWasteById(id: string, token): Observable<any> {
		return this.http.get(host + '/diedFishery/get', this.setHeaderId(id, token));
	}

	public updateWaste(data: any, token):  Observable<any> {
		return this.http.put(host + '/diedFishery/update', data, this.appService.setHeader(token));
	}

}
