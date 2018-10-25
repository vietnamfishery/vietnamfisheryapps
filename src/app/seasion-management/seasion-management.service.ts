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

  public getSeason(token: string): Observable<any> {
    const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}
		return this.http.get<any>(host + '/seasons/gets', h);
	}
	
	public getSeasonById(seasonId: number, token: string): Observable<any> {
    const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
		}
		return this.http.get<any>(host + '/seasons/get/' + seasonId, h);
  }

  public addseason(data: any, token: string): Observable<any> {
    const h: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': token
			})
    }
    return this.http.post(host + '/seasons/add', data, h);
	}
}
