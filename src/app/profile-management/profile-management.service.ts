import { Injectable } from '@angular/core';
import { api_url, api_port } from '../constants';
import { HttpClient } from '@angular/common/http';

const host = api_url + ':' + api_port + '/api';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {

  constructor(
    private http: HttpClient
  ) { }
}
