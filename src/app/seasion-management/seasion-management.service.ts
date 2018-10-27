import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_url, api_port } from '../constants/api';
import { actionUserServices, ActionServer } from '../constants';
import { Observable } from 'rxjs';


const host = api_url + ':' + api_port + '/api';
const headers = new  HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class SeasionManagementService {

  constructor(
    private http: HttpClient,
    private router: Router
	) { }
	
	private setHeader(token: string): any {
		return {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}
	}

  public getSeason(token: string): Observable<any> {
		return this.http.get<any>(host + '/seasons/gets', this.setHeader(token));
	}
	
	public getSeasonById(seasonId: number, token: string): Observable<any> {
		return this.http.get<any>(host + '/seasons/get/' + seasonId, this.setHeader(token));
  }

  public addseason(data: any, token: string): Observable<any> {
    return this.http.post(host + '/seasons/add', data, this.setHeader(token));
	}

	public updateseason(data: any, token: string): Observable<any> {
		return this.http.put(host + '/seasons/update', data, this.setHeader(token));
	}
}
