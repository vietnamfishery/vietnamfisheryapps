import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { api_url, api_port } from '../constants/api';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class HarvestManagementService {

  constructor(
		private appService: AppService,
    private http: HttpClient,
		private router: Router
  ) { }

  public getHarvestAll(token: string): Observable<any> {
    return this.http.post(host + '/harvest/gets', {
			seasonId: 15,
			pondId: 39
		},this.appService.setHeader(token));
	}
  
}
