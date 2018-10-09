import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url, api_port } from '../contants/api';
import { APP_FORM_FILE } from '../contants/http';

const host = api_url + ':' + api_port + '/api';
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
}
@Injectable({
  providedIn: 'root'
})
export class PondManagementService {

  constructor(
    private http: HttpClient
  ) {

  }

  public addpond(form: any): Observable<any> {
    const fd = new FormData();
    const file: File = <File>form.value.files
    const { pond, pondarea, ponddepth, pondstatus } = form.value;
    fd.append('image', file, file.name);
    fd.append('pond', pond);
    fd.append('pondArea', pondarea);
    fd.append('pondDepth', ponddepth);
    fd.append('pondStatus', pondstatus);
    console.log(file);
    return this.http.post(host + '/uploads/image', fd);
  }
}
