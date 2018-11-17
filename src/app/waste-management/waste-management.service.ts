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

  public getAllWaste(data: any, token: string): Observable<any> {
    return this.http.post(host + '/diedFishery/gets', data, this.appService.setHeader(token));
	}
	
	public getWasteByWasteUUId(data: any, token): Observable<any> {
		return this.http.post(host + '/diedFishery/get/diedFisheryUUId', data, this.appService.setHeader(token));
	}

	public updateWaste(data: any, token):  Observable<any> {
		return this.http.put(host + '/diedFishery/update', data, this.appService.setHeader(token));
    }
    
    public addWaste(data: any, token: string): Observable<any> {
		return this.http.post(host + '/diedFishery/add', data, this.appService.setHeader(token));
	}
}
