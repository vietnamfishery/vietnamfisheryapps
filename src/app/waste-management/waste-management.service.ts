import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../constants/api';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

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
				'Authorization': 'vietnamfishery' + ' ' + token,
				'diedfisheryid': id
			})
		}
	}

  public getAllWaste(data: any, token: string): Observable<any> {
    return this.http.post(api + '/diedFishery/gets', data, this.appService.setHeader(token));
	}
	
	public getWasteByWasteUUId(data: any, token): Observable<any> {
		return this.http.post(api + '/diedFishery/get/diedFisheryUUId', data, this.appService.setHeader(token));
	}

	public updateWaste(data: any, token):  Observable<any> {
		return this.http.put(api + '/diedFishery/update', data, this.appService.setHeader(token));
    }
    
    public addWaste(data: any, token: string): Observable<any> {
		return this.http.post(api + '/diedFishery/add', data, this.appService.setHeader(token));
	}
}
